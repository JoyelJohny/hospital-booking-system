# Hospital Booking System  

## 1. Overview  

### 1.1. Project  
The Hospital Booking System is an enterprise-grade solution designed to streamline hospital operations by managing treatments, doctors, and patient bookings efficiently. It facilitates seamless appointment scheduling for patients without requiring authentication, while providing admins with robust tools to oversee and manage hospital services via a comprehensive dashboard.  

Leveraging a Calendly-like approach for setting doctor availability ensures flexibility and user-friendliness. The system maintains data integrity by updating booking statuses instead of deleting records, supporting auditability and traceability.  

### 1.2. User Stories  

#### Admin  

##### Authentication  
- Secure login to access and manage the dashboard.  
- JWT-based authentication for all admin actions.  

##### Manage Treatments  
- Add, update, or delete hospital treatments.  

##### Manage Doctors  
- Add, update, or delete doctor profiles and link them to treatments.  

##### Manage Doctor Availability  
- Define, update, or remove doctor availability using a Calendly-like format, specifying slot durations and buffer times.  

##### View and Cancel Bookings  
- Access all patient bookings.  
- Cancel bookings and notify patients via email.  

##### Handle Cancellation Requests  
- Review patient cancellation requests.  
- Approve or reject requests, updating booking statuses and notifying patients accordingly.  

#### Patient  

##### Browse Treatments  
- View all available treatments offered by the hospital.  

##### View Doctors by Treatment  
- See doctors associated with a specific treatment.  

##### View Available Time Slots  
- Check a doctor's availability based on the selected date and time.  

##### Book Appointment  
- Schedule appointments by providing necessary details without authentication.  
- Receive confirmation emails upon successful booking.  

##### Request Cancellation  
- Submit cancellation requests by entering booking ID, phone number, and date of birth.  
- Admins process these requests for approval.  

# How to Run the Hospital Booking System on Your Local Machine  

Follow these steps to set up and run the Hospital Booking System locally.  

---

## **Prerequisites**  
Ensure you have the following installed on your machine:  
- **Node.js** (v16 or higher)  
- **npm** (Node Package Manager) or **yarn**  
- **MongoDB** (Ensure it's running locally or provide a connection string to a remote database)  
- **Git** (for cloning the repository)  

---

## **Steps to Run the Project**  

### **1. Clone the Repository**  
```bash
git clone https://github.com/your-repo/hospital-booking-system.git
cd hospital-booking-system
```

### **2. Install Dependencies**  
```bash
npm install
```

### **3. Create an .env.local file in the directory and configure the following environment variables**  
```plaintext
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_SERVICE=your_email_service_prove #Eg:Gmail
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_pass
NEXT_PUBLIC_API_URI=your_hosting_web_address #Eg:https://myapp.com for default it has been set to http://localhost:3000
ADMIN_USER=admin_username # Create admin user with this name. For default the admin username is admin
ADMIN_PASS=admin_pass  # password to login into admin mode. For default this has been set to admin123
ADMIN_EMAIL=your_email_address # The app have a feature to send email to admin when a request for booking cancellation is made.
```

### **4. Now run the app with command**  
```bash
npm run start  
```
***To visit the admin Page place admin after / in homepage. For Eg.ht<span>tp://</span>localhost:3000/admin*** 
