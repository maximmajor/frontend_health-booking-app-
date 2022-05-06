This is a simple application using react native that fetches hospitals
around and allows users to be able to select a hospital and book for
an appointment with a doctor. 

The api to get the hospitals around return a list of hospitals from your backend.
No login process is included in this task.


Simple user story
1. As a user I want to book a doctor from a selected hospital.
2. I want to see a success or failure message after booking.
3. I don’t want to login but I want to include my name, phone, email,
   illness type and upload my photo during the booking.

TECHNOLOGIES:
1. Expo react native cli
2. typescript
3. React Native Navigation 6
4. inbuilt fetch
5. styled component


Documentation: once you clone the project,
1. run yarn (to get all dependenciesand node modules)
2. run yarn start. (to start the project)
3. you must have an android emulator to run this app



BACKEND API
the backend can be clone from the
git@github.com:maximmajor/backend_health-booking-app.git


1.  to add list of hospitals:
    Request: POST
    routes: baseUrl/hospital/add
          body: {
            "hospitalName": "Adefemi Hospital",
            "address": "ikeja lagos",
            "doctorsName": "mr tomisola abigail"

    }

2.  to see list of hospital
    Request: GET
    routes: baseUrl/hospital/list

3.  to see mock list of hospial
    Request: GET
    routes: baseUrl/hospital/list/mock


4.  to book for an appointment with a doctor.
    Request: POST
    routes: baseUrl/users/book/appointment/:hospitalId

    please note that email must be unique to get a "success" response

           body: {
            "name": "major",
            "phonenNmber": 070.....,
            "email": "me@gmail.com",
            "illnessType": malaria ,
            "photo": .jpg
            }

    Response:
    if went through "success"
    if not "failure"

samples of the screens:

<img
src="relative/path/in/repository/to/istImage.jpeg”
raw=true
alt=“home screen”
style=“margin-right: 10px;”
/>


<img
src=“./secondImage.jpeg”
raw=true
alt=“details screen”
style=“margin-right: 10px;”
/>
