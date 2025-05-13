 It looks like I ran into an error while trying to simulate generating demo product data. But no worries — we can still go ahead and manually define the structure and example data for your demo users in a format you can insert into your MongoDB.

Here's how to structure the *5 demo business users* (selling products):
```json
{
  "accountType": "business",
  "businessName": "SmartTech Mbeya",
  "email": "smarttech@demo.com",
  "phone": "0755123456",
  "password": "hashed_password",
  "tinNumber": "12345678",
  "paymentInfo": {
    "mpesa": "654321",
    "bankAccount": "022455788"
  },
  "businessType": "products",
  "category": "Electronics",
  "description": "Best gadgets and smart devices in Mbeya",
  "location": {
    "country": "Tanzania",
    "region": "Mbeya",
    "ward": "Ilemi",
    "street": "Soweto",
    "coordinates": {
      "type": "Point",
      "coordinates": [33.45, -8.91]
    }
  },
  "paymentPlan": "free",
  "status": "active"
}


You can repeat this structure with small variations for:
- A fashion store
- A bookshop
- A groceries business
- A tech accessories shop

---

For 5 *service-providing business users*:
Change `businessType` to `"services"` and use categories like:
- Graphic Design
- Photography
- Plumbing
- Electrical Repairs
- Salon/Beauty Services


For 5 *delivery agent accounts*:
```json
{
  "accountType": "delivery",
  "firstName": "Alex",
  "lastName": "Mwakalobo",
  "email": "alex.delivery@demo.com",
  "phone": "0755333444",
  "password": "hashed_password",
  "tinNumber": "99999999",
  "paymentInfo": {
    "mpesa": "123123",
    "bankAccount": "090909090"
  },
  "transportType": "Motorbike",
  "preferredRoutes": "Mbeya Urban",
  "location": {
    "country": "Tanzania",
    "region": "Mbeya",
    "ward": "Iyunga",
    "street": "Airport Road",
    "coordinates": {
      "type": "Point",
      "coordinates": [33.46, -8.90]
    }
  },
  "paymentPlan": "free",
  "status": "active"
}


You can create variations of this for the other 4 delivery agents.



Would you like me to generate all 15 of these as ready-to-import JSON files for MongoDB?




