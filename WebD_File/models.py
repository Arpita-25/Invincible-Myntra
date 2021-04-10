from app import db,ma
import datetime
from marshmallow import Schema, fields, ValidationError, pre_load

class User(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(20),nullable=False)
    last_name = db.Column(db.String(20))
    email = db.Column(db.String(70), unique = True)
    password = db.Column(db.String(80))
    register_date = db.Column(db.DateTime, nullable=False, default= datetime.datetime.utcnow())
    is_admin = db.Column(db.Boolean,nullable=False, default=False )
    chest = db.Column(db.Integer)
    shoulder= db.Column(db.Integer)
    frontal = db.Column(db.Integer)

    def __repr__(self):
         return f"User('{self.first_name}', '{self.email}', '{self.register_date}')"


# class UserSchema(Schema):
#     __table_args__ = {'extend_existing': True}
#     id = fields.Int(dump_only=True)
#     first_name = fields.Str()
#     last_name = fields.Str()
#     email = fields.Str()
#     password = fields.Str()
#     register_date = fields.DateTime()
#     is_admin = fields.Bool()

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        include_fk = True

user_schema = UserSchema()
users_schema = UserSchema(many=True)

# address table schema
class Address(db.Model):
    __table__args={'extended_existing':True}
    id = db.Column(db.Integer,nullable=False,primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    full_name = db.Column(db.String(100),nullable=False)
    address_1 = db.Column(db.String(100),nullable=False)
    address_2 = db.Column(db.String(100),nullable=False)
    pincode = db.Column(db.String(6),nullable=False)
    city = db.Column(db.String(20),nullable=False)
    user= db.relationship('User',backref='address',lazy=True)

# Order table schema

class OrderDetails(db.Model):
    __table__args ={'extended_existing':True}
    id = db.Column(db.Integer,nullable=False,primary_key=True)
    order_id = db.Column(db.Integer,db.ForeignKey('order.id'),nullable=False)
    product_details_id = db.Column(db.Integer,db.ForeignKey('product_details.id'),nullable=False)
    quantity= db.Column(db.Integer,nullable=False,default=1)

    def __repr__(self):
        return f"OrderDetails('{self.id}','{self.order_id}','{self.quantity}','{self.product_details_id}')"

class Order(db.Model):
    __table__args = {'extended_existing':True}
    id = db.Column(db.Integer,nullable=False,primary_key=True)
    user_id= db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    order_date = db.Column(db.DateTime, nullable=False, default= datetime.datetime.utcnow())
    amount = db.Column(db.Integer,nullable=False)
    address_id = db.Column(db.Integer,db.ForeignKey('address.id'),nullable=False)
    order_details = db.relationship('OrderDetails',backref='order',lazy=True)

    def __repr__(self):
        return f"Order('{self.id}','{self.user_id}','{self.amount}','{self.order_date}')"

class Cart(db.Model):
    __table__args__ = {'extended_existing':True}
    id = db.Column(db.Integer,nullable=False,primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    product_details_id = db.Column(db.Integer, db.ForeignKey('product_details.id'), nullable=False)
    quantity = db.Column(db.Integer)

    def __repr__(self):
        return f"Cart('{self.user_id}', '{self.product_id}, '{self.quantity}')"

class CartSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Cart

    id = ma.auto_field()
    user_id = ma.auto_field()
    product_id = ma.auto_field()
    quantity = ma.auto_field()
    product = fields.Nested(lambda: ProductSchema(only=("id","brand","description")))
    product_details_id = ma.auto_field()
    product_detail = fields.Nested(lambda: ProductDetailsSchema(only=("id", "size")))
    quantity =  ma.auto_field()

cart_schema = CartSchema()
carts_schema = CartSchema(many=True)

class ProductDetails(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer,nullable=False,primary_key=True)
    product_id = db.Column(db.Integer,db.ForeignKey('product.id'))
    size = db.Column(db.String(5),nullable=False)
    quantity =db.Column(db.Integer,nullable=False)
    carts= db.relationship("Cart",backref='product_detail',lazy=True)

    def __repr__(self):
        return f"ProductDetails('{self.product_id}','{self.size}','{self.quantity}')"

class ProductDetailsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ProductDetails

    size = ma.auto_field()
    quantity = ma.auto_field()


productdetails_schema = ProductDetailsSchema()
productsdetails_schema = ProductDetailsSchema(many=True)

class Product(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(100), nullable=False)
    brand = db.Column(db.String(50),nullable=False)
    regular_price = db.Column(db.Integer,nullable=False)
    image = db.Column(db.String(20),nullable=False,default='default.jpg')
    discount = db.Column(db.Integer,nullable=False,default=0)
    product_rating = db.Column(db.Integer)
    product_review = db.Column(db.String(100), nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    details = db.relationship("ProductDetails",backref='product',lazy=True)
    carts= db.relationship("Cart",backref='product',lazy=True)

    def __repr__(self):
        return f"Product('{self.id}','{self.product_name}','{self.description}', '{self.regular_price}', '{self.discount}')"

class ProductSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Product

    id = ma.auto_field()
    product_name = ma.auto_field()
    description = ma.auto_field()
    brand = ma.auto_field()
    regular_price = ma.auto_field()
    image = ma.auto_field()
    discount = ma.auto_field()
    product_rating = ma.auto_field()
    category_id = ma.auto_field()
    category = fields.Nested(lambda: CategorySchema(only=("id", "name")))
    details = fields.List(fields.Nested(ProductDetailsSchema))

product_schema = ProductSchema()
products_schema = ProductSchema(many=True)


class Category(db.Model):
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key = True)
    name=db.Column(db.String(100),nullable=False)
    description = db.Column(db.String(200))
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    products = db.relationship('Product',backref='category',lazy=True)
    def __repr__(self):
        return f"Category('{self.id}', '{self.name}')"




class CategorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Category

    name = ma.auto_field()
    description = ma.auto_field()
    date_posted = ma.auto_field()
    products =  fields.List(fields.Nested(ProductSchema))


category_schema = CategorySchema()
categorys_schema = CategorySchema(many=True)





class Wishlist(db.Model):
    __table__args__ = {'extended_existing':True}
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False, primary_key=True)

    def __repr__(self):
        return f"Wishlist('{self.user_id}', '{self.product_id}')"
