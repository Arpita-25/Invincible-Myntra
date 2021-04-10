from flask import Flask, request, jsonify, make_response ,send_file
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow
from flask.helpers import safe_join
from flask_cors import CORS
from functools import wraps
import jwt
import json
import datetime
import os
import uuid
import base64
import re

from size_recommendation import testing
from skin_tone_detection import get_image


app = Flask(__name__)

app.config['SECRET_KEY'] = 'myntraHackathon'
CORS(app)
# database name
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
# creates SQLALCHEMY object
db = SQLAlchemy(app)
ma = Marshmallow(app)
bcrypt = Bcrypt(app)



def token_required(func):
    def wrapper(*args,**kwargs):

        token = request.headers['x-auth-token']

        if not token:
            return jsonify({'message':'Token is missing'})

        try:
            data = jwt.decode(token,app.config['SECRET_KEY'],algorithms=["HS256"])
            request.data = data
        except:
            return jsonify({'message':'invalid token'})
        return func(*args,**kwargs)
    wrapper.__name__ = func.__name__
    return wrapper



from models import User,user_schema,users_schema,Category,categorys_schema,category_schema,Product,products_schema,product_schema,ProductDetails,Cart,carts_schema,cart_schema

#auth decorator to act as middleware

@app.route("/",methods=["GET"])
def getpost():
    return jsonify({'message':"something"})

@app.route("/allUsers",methods=["GET"])
def printAllUsers():
    users = User.query.all()
    result = users_schema.dump(users)
    return jsonify({"users": result})



@app.route("/register",methods=["POST"])
def register():
    req = request.json
    if(req.get('first_name') and req.get('email') and req.get('password')):
        # print(req['email'])

        user = User.query.filter_by(email= req['email']).first()

        if(user):
            return jsonify({'message':'seems like the email id is already registered'})

        password = bcrypt.generate_password_hash(req['password']).decode('utf-8')
        user1 = User(first_name=req['first_name'],last_name=req['last_name'],email=req['email'],password=password,is_admin = req['is_admin'])
        db.session.add(user1)
        db.session.commit()
        token = jwt.encode({'id':user1.id,'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=180)},app.config['SECRET_KEY'])
        # print("token:"+token.decode('UTF-8'))
        if token:
            resp = {
                'token': token,
                'user' : {
                    'first_name': user1.first_name,
                    'last_name' : user1.last_name,
                    'email': user1.email,
                    'id' : user1.id
                }
            }
            return jsonify(resp)
        else:
            return jsonify({'message':'Problem in creating a token'})
    else:
        return jsonify({'message': 'please enter all the values required for the creation of a new user'})


@app.route("/login",methods=["POST"])
def login():
    req = request.json

    if(req.get('email') and req.get('password')):

        user = User.query.filter_by(email= req['email']).first()

        if(user):
            if(user and bcrypt.check_password_hash(user.password,req['password'])):
                #things to do after checking the email and password
                token = jwt.encode({'id':user.id,'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=180)},app.config['SECRET_KEY'])
                # print("token:"+token.decode('UTF-8'))
                if token:
                    resp = {
                        'token': token,
                        'user' : user_schema.dump(user)
                    }
                    return jsonify(resp)
                else:
                    return jsonify({'message':'Problem in creating a token'})
            else:
                return jsonify({'message':'it seems that this email is not registered'})
        else:
            return jsonify({'message':'Login Unsuccesful.Please check email and password'})


@app.route('/login/user',methods=['GET'])
@token_required
def protected():
    data = request.data
    print(data)
    user = User.query.get(data['id'])
    if user:
        resp ={
            'first_name': user.first_name,
            'last_name' : user.last_name,
            'email':user.email,
            "id":user.id
        }
        return jsonify(resp)
    else:
        return jsonify({'message':'This is a protected'})


@app.route('/category/new',methods=['POST'])
@token_required
def createNewCategory():
    # try:
        user = User.query.get(request.data['id'])

        if not user.is_admin :
            return jsonify({'message' : 'only a admin can access this route'})

        body = request.json

        if not body.get('name'):
            return jsonify({'message' : 'please provide all the essential info'})

        newCategory = Category(name=body['name'],description=body['description'])

        if not newCategory:
            return jsonify({'message':'Could not create the new category'})

        db.session.add(newCategory)
        db.session.commit()
        rep = {
            'name' : newCategory.name,
            'id':newCategory.id,
            'description':newCategory.description
        }

        return jsonify(rep)
    # except :
        # return jsonify({'message':'Could not create the new category'})



@app.route("/category/all",methods=["GET"])
def printAllCategories():
    categories = Category.query.all()
    result = categorys_schema.dump(categories)
    return jsonify({"categories": result})

@app.route('/category/<int:category_id>/update',methods=['POST'])
@token_required
def updateCategory(category_id):
    user = User.query.get(request.data['id'])
    if not user.is_admin :
        return jsonify({'message' : 'only a admin can access this route'})
    data = request.json
    category = Category.query.get(category_id)
    if data['name'] :
        category.name = data['name']
    if data['description'] :
        category.description = data['description']
    db.session.commit()
    return jsonify(category_schema.dump(category))

@app.route('/category/<int:category_id>/delete',methods=['POST'])
@token_required
def deleteCategory(category_id):
    user = User.query.get(request.data['id'])
    if not user.is_admin :
        return jsonify({'message' : 'only a admin can access this route'})
    data = request.json
    category= Category.query.get_or_404(category_id)
    db.session.delete(category)
    db.session.commit()
    return jsonify({'message' : 'Category deleted succesfully'})

#routes for crud application of Product
@app.route('/product/new',methods=['POST'])
@token_required
def createNewProduct():
    user = User.query.get(request.data['id'])
    if not user.is_admin :
        return jsonify({'message' : 'only a admin can access this route'})
    data = request.json
    category = Category.query.filter_by(name= data['category_name']).first()
    if not category:
        return jsonify({'message' : 'Please enter a valid category'})
    newProduct = Product(product_name=data['product_name'],description=data['description'],brand=data['brand'],discount=data['discount'],regular_price=data['regular_price'],category_id=category.id,image=data['image'])
    db.session.add(newProduct)
    db.session.commit()
    if(data['details']):
        print('gonna start entering the product details')
        for detail in data['details']:
            prod_details = ProductDetails(product_id=newProduct.id,size=detail['size'],quantity=detail['quantity'])
            db.session.add(prod_details)
            db.session.commit()
    return jsonify(product_schema.dump(newProduct))

@app.route('/product/all',methods=['GET'])
@token_required
def getAllProduct():
    user = User.query.get(request.data['id'])
    if not user.is_admin :
        return jsonify({'message' : 'only a admin can access this route'})
    products = Product.query.all()
    result = products_schema.dump(products)
    return jsonify(result)

@app.route('/product/<int:product_id>/delete',methods=['POST'])
@token_required
def deleteProduct(product_id):
    user = User.query.get(request.data['id'])
    if not user.is_admin :
        return jsonify({'message' : 'only a admin can access this route'})
    product= Product.query.get_or_404(product_id)

    db.session.delete(product)
    details= ProductDetails.query.filter_by(product_id = product_id ).all()
    for detail in details:
        db.session.delete(details)
    db.session.commit()

    return jsonify({'message' : 'The product was deleted succesfully'})


@app.route('/category/<int:category_id>/products',methods=['GET'])
def categoryProducts(category_id):
    category = Category.query.get(category_id)
    result = category_schema.dump(category)
    # print(result)
    return jsonify(result)


@app.route('/category/<int:category_id>/product/<int:product_id>',methods=['GET'])
def getProduct(category_id,product_id):
    category = Category.query.get(category_id)
    if not category:
        return jsonify({'message':'no such category'})
    category_result = category_schema.dump(category)
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'message':'no such product with this product id'})
    product_result = product_schema.dump(product)

    return jsonify({'category' : category_result,'product' : product_result})





@app.route('/cartitems',methods=['GET'])
@token_required
def userCartItem():
    user = User.query.get(request.data['id'])
    productsInCart = Cart.query.filter_by(user_id=user.id).all()
    result = carts_schema.dump(productsInCart)
    return jsonify(result)

@app.route('/addtocart',methods=['POST'])
@token_required
def addToCart():
    user = User.query.get(request.data['id'])
    data = request.json
    newProductInCart = Cart(user_id=user.id,product_id=data['product_id'],product_details_id=data['product_details_id'],quantity=data['quantity'])
    db.session.add(newProductInCart)
    db.session.commit()
    return jsonify({'message' : 'item has been added to the cart'})

@app.route('/cartitems/<int:cart_id>/delete',methods=['POST'])
@token_required
def deletefromCart(cart_id):
    user = User.query.get(request.data['id'])
    cartProductsToBeDeleted = Cart.query.get(cart_id)
    db.session.delete(cartProductsToBeDeleted)
    db.session.commit()
    return jsonify({'message' : 'The product has been deleted from the users cart '})

@app.route('/cartitems/<int:cart_id>/update',methods=['POST'])
@token_required
def UpdateCart(cart_id):
    user = User.query.get(request.data['id'])
    data = request.json
    cartProductsToBeDeleted = Cart.query.get(cart_id)
    if data['quantity']:
        cartProductsToBeDeleted.quantity = data['quantity']
    db.session.commit()
    return jsonify(cart_schema.dumps(cartProductsToBeDeleted))

@app.route('/tryiton/product/<int:product_id>',methods=['POST'])
def tryItOn(product_id):
    data = request.json
    product = Product.query.get(product_id)
    imgdata = base64.b64decode(re.sub("data:image/jpeg;base64,", '', str(data['image'])))
    random_id = uuid.uuid4()
    filename = 'uploads/' + str(random_id) + ".jpg" # I assume you have a way of picking unique filenames
    with open(filename, 'wb') as f:
        f.write(imgdata)

    # recommendedProd = _______

    return jsonify({'message':'successful'})



@app.route('/upload/<filename>',methods=['GET'])
def hostFiles(filename):
    # filename = safe_join(app.root_path,"some_image")
    print(filename)
    return send_file(os.getcwd() + '/uploads' +'/' + filename)

@app.route('/testing',methods=['GET'])
@token_required
def xyz():
    data = request.data
    user = User.query.get(data['id'])
    recomSize = testing(user.chest,user.frontal,user.shoulder)
    return jsonify({'recommendedSize' : recomSize})

@app.route('/storeSize',methods=['POST'])
@token_required
def storeSize():
    req = request.json
    data = request.data
    user = User.query.get(data['id'])
    if(req.get('chest') and req.get('frontal') and req.get('shoulder')) :
        user.chest = req.get('chest')
        user.frontal = req.get('frontal')
        user.shoulder = req.get('shoulder')
        db.session.commit()
        result = user_schema.dump(user)
        return jsonify({'user' : result})
    else:
        return jsonify({'message' : 'Please fill all the required fields'})

@app.route('/fileUpload',methods=['POST'])
def storeUploadedFile():
    file = request.files['image']
    file.save(dst='uploads/example.jpg', buffer_size=16384)
    file.save(dst='try_on/custom/test/image/000183_0.jpg', buffer_size=16384)

    return jsonify({'message' : "file upload is done"})

@app.route('/skinTone',methods=['GET'])
def skinTone():
    skinTone = get_image()
    return jsonify({'skinTone' : skinTone})


def getApp():
    return app


if __name__ == "__main__":
    app.run(debug=True)
