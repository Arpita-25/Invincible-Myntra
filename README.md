# Invincible

This repository is made for the sole purpose of **Myntra HackerRamp: WeForShe** based on theme **Size and Fit**.
![Hackerr](https://user-images.githubusercontent.com/64279181/113337916-0ffa7c80-9346-11eb-833d-570329426875.png)
Presented By:

  - [Arpita Mohapatra](https://github.com/Arpita-25)
  - [Aparajita Panigrahi](https://github.com/Aparajita289)
  - [Sayna Parida](https://github.com/sayna3311)

One of the most popular activities on the Web is shopping. It has much allure in it — you can shop at your leisure, anytime, and in your pajamas. Consumers can easily search through a large database of products and services. They can see actual prices, build an order over several days and email it as a "wish list" hoping that someone will pay for their selected goods. Customers can compare prices with a click of the mouse and buy the selected product at best prices. Online vendors, in their turn, also get distinct advantages.  

While ecommerce has an access to global markets fulfilling costumers’ fashion needs worldwide, there can be lack of security, reliability leading to increasing returns, reverse pickup cost, etc leading to huge loss. Wrong size and fit is the top reason for returning of merchandise bought online leading to increased added cost, clash of fashion and tech.
To tackle with this problem we have devised a [solution](https://github.com/Arpita-25/Invincible-Myntra/tree/main/Round%201) and a detailed technical [solution](https://github.com/Arpita-25/Invincible-Myntra/blob/main/Round%202/Round2_Invincible.pptx) for further understanding.

Our idea mainly focuses on three key features: **Size Recommendation based on body measurements given by user**, **Virtual cloth fitting** and **cloth recommendation according to skin-tone** which would surely improve an user's overall experience while surfing through different products on an online fashion store. These three techniques have been successfully implemented in an Web-App whose front-end is built using **React JS** framework and python based **Flask** framework is being used for backend. 

![react-and-flask](https://user-images.githubusercontent.com/64279181/114270858-3a29f980-9a2c-11eb-8c07-b51096682a27.png)

The UI has been built in such a way that it has a **clean interface**, **easy navigation**, **clear visibilty** and **good legibility** such that the user's overall experience can be improved. The overall design of the web application and the live demo has been explained in this [video](https://github.com/Arpita-25/Invincible-Myntra/blob/main/Round%202/NITRourkela_Invincible_LIVE_DEMO.mp4).

## 1. SIZE RECOMMENDATION
After the user uploads his/her photo, the user is asked to input body measurements like chest size, shoulder length and frontal body length.

Based on the body meaesurements, size of the cloth is predicted by comparing to the available sizes in the database and returns the best matching size and accordingly displays the recommended size after an apparel is chosen.
For detailed explanation of our size recommendation module, please refer the [video](https://github.com/Arpita-25/Invincible-Myntra/blob/main/Round%202/NITRourkela_Invincible_INTRO.mp4).

![size](https://user-images.githubusercontent.com/64279181/114277206-ddd4d300-9a47-11eb-9989-cfed4f6f7dcc.png)

## 2. VIRTUAL TRY-ON
After selecting a particular apparel and after the size is recommended, the selected apparel is fitted on to the user's uploaded image as if the user is virtually trying on the cloth.
Moving on to the technical details, we are first wrapping the selected cloth in the manner of the dress worn by the user in that photo and then fitting it over his/her image in order to give a feeling of virtual try-on. The first part is called as GMM(Geometric Matching Module) and the second part is TOM(Try-ON Module).
The overall flow of the virtual Try-on is shown below.

![try](https://user-images.githubusercontent.com/64279181/114277633-90f1fc00-9a49-11eb-9e2f-d3f6cc4ef9d8.png)

The detailed technical explanation can be referred from this [video](https://github.com/Arpita-25/Invincible-Myntra/blob/main/Round%202/NITRourkela_Invincible_VIRTUAL_TRY-ON.mp4).

