# Interior Design Platform - API Documentation

## Base URL
```
Production: https://api.godecormate.com/api
```

## Authentication
The API uses Firebase Authentication with JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your-firebase-token>
```

## Response Format
All API responses follow this structure:
```json
{
  "success": true|false,
  "message": "Response message",
  "data": {}, // Response data (if successful)
  "errors": [] // Error details (if failed)
}
```

---

## 🔐 Authentication Endpoints

### Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "role": "user|vendor|admin",
  "firebaseToken": "firebase-id-token",
  "authProvider": "email|google|apple",
  "title": "Interior Designer", // For vendors
  "professionType": "Interior Designer|Architect|Contractor|Consultant|Other",
  "location": {
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isVerified": false
    }
  }
}
```

### Login User
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "firebaseToken": "firebase-id-token"
}
```

### Complete Vendor Registration
**POST** `/api/auth/complete-registration`

**Request Body (FormData):**
```
name: "John Doe"
title: "Interior Designer"
about: "Professional interior designer with 5 years experience"
license: "LIC123456"
categories: ["Living Room", "Bedroom"]
projectTypes: ["Residential", "Commercial"]
styles: ["Modern", "Contemporary"]
languages: ["English", "Hindi"]
businessHighlights: ["5+ years experience", "Award winning designs"]
profileImage: <file>
coverImage: <file>
```

### Get User Profile
**GET** `/api/auth/profile`

**Headers:** `Authorization: Bearer <token>`

### Update User Role
**PUT** `/api/auth/update-role`

**Request Body:**
```json
{
  "role": "vendor"
}
```

---

## 👤 User Management

### Get User Profile
**GET** `/api/users/profile`

### Update User Profile
**PUT** `/api/users/profile`

**Request Body (FormData):**
```
name: "John Doe"
phone: "+919876543210"
address: "123 Main Street"
city: "Mumbai"
state: "Maharashtra"
pincode: "400001"
profileImage: <file>
```

### Get User Dashboard
**GET** `/api/users/dashboard`

### Add to Favorites
**POST** `/api/users/favorites`

**Request Body:**
```json
{
  "productId": "product_id"
}
```

### Remove from Favorites
**DELETE** `/api/users/favorites/:productId`

### Get User Favorites
**GET** `/api/users/favorites`

### Delete User Account
**DELETE** `/api/users/profile`

---

## 🏢 Vendor Management

### Get All Vendors
**GET** `/api/vendors`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by category
- `location` (optional): Filter by location
- `rating` (optional): Minimum rating filter

### Get Vendor by ID
**GET** `/api/vendors/:id`

### Get Vendor Profile (Authenticated)
**GET** `/api/vendors/profile`

### Update Vendor Profile
**PUT** `/api/vendors/profile`

**Request Body (FormData):**
```
name: "John Doe"
title: "Senior Interior Designer"
about: "Updated description"
license: "LIC123456"
categories: ["Living Room", "Kitchen"]
projectTypes: ["Residential", "Commercial"]
styles: ["Modern", "Minimalist"]
languages: ["English", "Hindi", "Marathi"]
businessHighlights: ["10+ years experience", "Award winning"]
profileImage: <file>
coverImage: <file>
portfolio: <file> (multiple files)
documentImage: <file>
```

### Get Vendor Dashboard
**GET** `/api/vendors/dashboard`

### Get Category Breakdown
**GET** `/api/vendors/categories/breakdown`

### Get Vendor Plan
**GET** `/api/vendors/plan`

### Get Recent Activities
**GET** `/api/vendors/recent-activities`

### Update Vendor Images
**PUT** `/api/vendors/profile/images`

**Request Body (FormData):**
```
profileImage: <file>
coverImage: <file>
```

### Get Performance Metrics
**GET** `/api/vendors/performance`

### Upload Portfolio Images
**POST** `/api/vendors/profile/portfolio`

**Request Body (FormData):**
```
portfolio: <file> (multiple files, max 10)
```

### Get Available Tags
**GET** `/api/vendors/tags`

### Get Popular Tags
**GET** `/api/vendors/tags/popular`

### Delete Portfolio Image
**DELETE** `/api/vendors/profile/portfolio`

**Request Body:**
```json
{
  "imageUrl": "https://example.com/image.jpg"
}
```

### Admin: Get Pending Vendors
**GET** `/api/vendors/admin/pending`

### Admin: Approve Vendor
**PATCH** `/api/vendors/admin/:id/approve`

### Admin: Reject Vendor
**PATCH** `/api/vendors/admin/:id/reject`

---

## 🛍️ Product Management

### Get All Products
**GET** `/api/products`

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `category` (optional): Filter by category
- `vendorId` (optional): Filter by vendor
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `rating` (optional): Minimum rating filter
- `location` (optional): Location filter
- `tags` (optional): Tag filters (comma-separated)

### Get Product by ID
**GET** `/api/products/:id`

### Get Product Categories
**GET** `/api/products/categories`

### Get Categories
**GET** `/api/products/product-categories`

### Create Product (Vendor)
**POST** `/api/products`

**Request Body (FormData):**
```
name: "Modern Living Room Design"
category: "Living Room"
shortDescription: "Contemporary living room with modern furniture"
fullDescription: "Detailed description of the design..."
priceRange.min: "50000"
priceRange.max: "100000"
consultationFee: "5000"
customizablePackages: "true"
features: ["Custom furniture", "Lighting design", "Color consultation"]
tags: ["Modern", "Contemporary", "Luxury"]
materialsUsed: ["Wood", "Metal", "Glass"]
availableColors: ["White", "Gray", "Black"]
serviceAvailability: "Weekdays"
durationEstimate: "2-3 weeks"
location.serviceableAreas: ["Mumbai", "Pune", "Delhi"]
location.cities: ["Mumbai", "Pune"]
thumbnail: <file>
gallery: <file> (multiple files, max 10)
```

### Get Vendor Products
**GET** `/api/products/vendor/my-products`

### Get Top Products
**GET** `/api/products/vendor/top-products`

### Get Vendor Dashboard Stats
**GET** `/api/products/vendor/dashboard-stats`

### Get Product Analytics
**GET** `/api/products/:id/analytics`

### Update Product
**PUT** `/api/products/:id`

**Request Body (FormData):** Same as create product

### Toggle Product Status
**PATCH** `/api/products/:id/toggle-status`

### Bulk Update Products
**PUT** `/api/products/bulk-update`

**Request Body:**
```json
{
  "productIds": ["id1", "id2", "id3"],
  "updates": {
    "status": "active",
    "category": "New Category"
  }
}
```

### Delete Product
**DELETE** `/api/products/:id`

---

## 📂 Category Management

### Get All Categories
**GET** `/api/categories`

### Get Category by ID
**GET** `/api/categories/:id`

### Get Category Stats
**GET** `/api/categories/stats`

### Get Categories for Dropdown
**GET** `/api/categories/util/dropdown`

### Get Vendor Available Categories
**GET** `/api/categories/vendor/available`

### Get Vendor Selected Categories
**GET** `/api/categories/vendor/selected`

### Update Vendor Selected Categories
**PUT** `/api/categories/vendor/selected`

**Request Body:**
```json
{
  "categories": ["Living Room", "Kitchen", "Bedroom"]
}
```

### Create Vendor Category
**POST** `/api/categories/vendor/create`

**Request Body (FormData):**
```
title: "Custom Category"
description: "Category description"
image: <file>
```

### Update Vendor Category
**PUT** `/api/categories/vendor/:id`

### Delete Vendor Category
**DELETE** `/api/categories/vendor/:id`

### Admin: Create Category
**POST** `/api/categories`

**Request Body (FormData):**
```
title: "Category Name"
description: "Category description"
type: "room|service|style|feature|design|other"
image: <file>
```

### Admin: Update Category
**PUT** `/api/categories/:id`

### Admin: Delete Category
**DELETE** `/api/categories/:id`

---

## 💬 Messaging System

### Send Message
**POST** `/api/messages`

**Request Body:**
```json
{
  "vendorId": "vendor_id",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "message": "I'm interested in your services",
  "subject": "Consultation Request",
  "productId": "product_id" // optional
}
```

### Get User Messages
**GET** `/api/messages/my-messages`

### Get Vendor Messages
**GET** `/api/messages/vendor/messages`

### Get Vendor Message Stats
**GET** `/api/messages/vendor/stats`

### Get Vendor Unread Count
**GET** `/api/messages/vendor/unread-count`

### Mark Message as Read
**PATCH** `/api/messages/:id/read`

### Reply to Message
**POST** `/api/messages/:id/reply`

**Request Body:**
```json
{
  "reply": "Thank you for your interest. I'll get back to you soon."
}
```

### Delete Message
**DELETE** `/api/messages/:id`

---

## ⭐ Review System

### Create Review
**POST** `/api/reviews`

**Request Body (FormData):**
```
vendorId: "vendor_id"
productId: "product_id" // optional
rating: "5"
reviewText: "Excellent service and beautiful designs"
title: "Amazing work!"
customerName: "John Doe"
customerEmail: "john@example.com"
images: <file> (multiple files, max 5)
```

### Get Vendor Reviews
**GET** `/api/reviews/vendor/:vendorId`

### Get Product Reviews
**GET** `/api/reviews/product/:productId`

### Get User Reviews
**GET** `/api/reviews/my-reviews`

### Get My Reviews (Vendor)
**GET** `/api/reviews/vendor/my-reviews`

### Get My Review Stats (Vendor)
**GET** `/api/reviews/vendor/stats`

### Update Review
**PUT** `/api/reviews/:id`

### Delete Review
**DELETE** `/api/reviews/:id`

### Respond to Review (Vendor)
**POST** `/api/reviews/:id/respond`

**Request Body:**
```json
{
  "response": "Thank you for your feedback!"
}
```

### Admin: Get Pending Reviews
**GET** `/api/reviews/admin/pending`

### Admin: Approve Review
**PATCH** `/api/reviews/admin/:id/approve`

### Admin: Reject Review
**PATCH** `/api/reviews/admin/:id/reject`

---

## 🔍 Search & Discovery

### Global Search
**GET** `/api/search`

**Query Parameters:**
- `q` (required): Search query
- `category` (optional): Category filter
- `location` (optional): Location filter
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `rating` (optional): Minimum rating
- `tags` (optional): Tag filters
- `page` (optional): Page number
- `limit` (optional): Items per page

### Search Suggestions
**GET** `/api/search/suggestions`

**Query Parameters:**
- `q`: Search query

### Advanced Search
**GET** `/api/search/advanced`

**Query Parameters:**
- `category`: Category filter
- `location`: Location filter
- `minPrice`: Minimum price
- `maxPrice`: Maximum price
- `rating`: Minimum rating
- `tags`: Tag filters
- `vendorId`: Specific vendor
- `sortBy`: Sort by field (price, rating, date)
- `sortOrder`: Sort order (asc, desc)

### Search by Location
**GET** `/api/search/location`

**Query Parameters:**
- `lat`: Latitude
- `lng`: Longitude
- `radius`: Search radius in km
- `category`: Category filter

### Get Search Analytics (Admin)
**GET** `/api/search/analytics`

---

## 📤 File Upload

### Upload Image
**POST** `/api/upload/image`

**Request Body (FormData):**
```
image: <file>
```

### Upload Document
**POST** `/api/upload/document`

**Request Body (FormData):**
```
document: <file>
```

### Delete File
**DELETE** `/api/upload/delete`

**Request Body:**
```json
{
  "publicId": "cloudinary_public_id"
}
```

---

## 📊 Dashboard & Analytics

### Get Admin Dashboard Stats
**GET** `/api/dashboard/admin/stats`

### Get Recent Activities
**GET** `/api/dashboard/activities`

**Query Parameters:**
- `limit` (optional): Number of activities (default: 10)

### Get Top Vendors
**GET** `/api/dashboard/top-vendors`

**Query Parameters:**
- `limit` (optional): Number of vendors (default: 5)
- `metric` (optional): Metric type (default: revenue)

### Get Vendor Dashboard Stats
**GET** `/api/dashboard/vendor/stats`

### Get Vendor Profile
**GET** `/api/dashboard/vendor/my-profile`

### Admin: Get All Products
**GET** `/api/dashboard/admin/products`

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `vendorId` (optional): Filter by vendor
- `category` (optional): Filter by category
- `status` (optional): Filter by status

### Admin: Get Single Product
**GET** `/api/dashboard/admin/products/:id`

### Admin: Update Product
**PUT** `/api/dashboard/admin/products/:id`

### Admin: Delete Product
**DELETE** `/api/dashboard/admin/products/:id`

### Admin: Get All Categories
**GET** `/api/dashboard/admin/categories`

### Admin: Create Category
**POST** `/api/dashboard/admin/categories`

### Admin: Update Category
**PUT** `/api/dashboard/admin/categories/:id`

### Admin: Delete Category
**DELETE** `/api/dashboard/admin/categories/:id`

### Admin: Get All Vendors
**GET** `/api/dashboard/admin/vendors`

### Admin: Get Single Vendor
**GET** `/api/dashboard/admin/vendors/:id`

### Admin: Update Vendor
**PUT** `/api/dashboard/admin/vendors/:id`

### Admin: Delete Vendor
**DELETE** `/api/dashboard/admin/vendors/:id`

### Admin: Approve Vendor
**PATCH** `/api/dashboard/admin/vendors/:id/approve`

### Admin: Reject Vendor
**PATCH** `/api/dashboard/admin/vendors/:id/reject`

---

## 🎬 Posts & Content

### Get All Posts
**GET** `/api/posts`

### Get Post by ID
**GET** `/api/posts/:id`

### Get Vendor Posts
**GET** `/api/posts/vendors`

### Create Post (Vendor)
**POST** `/api/posts`

**Request Body (FormData):**
```
title: "Post Title"
description: "Post description"
video: <file> (video file)
```

### Update Post
**PUT** `/api/posts/:id`

### Like Post
**PATCH** `/api/posts/:id/like`

### Delete Post
**DELETE** `/api/posts/:id`

---

## 🔧 Admin Management

### Create Admin
**POST** `/api/admin/create-admin`

**Request Body:**
```json
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "secure_password",
  "role": "admin|superadmin",
  "permissions": ["user_management", "vendor_management", "product_management"]
}
```

### Admin Login
**POST** `/api/admin/login`

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "secure_password"
}
```

### Admin Logout
**POST** `/api/admin/logout`

### Validate Admin Session
**GET** `/api/admin/validate`

### Get Dashboard Stats
**GET** `/api/admin/dashboard/stats`

### Get Admin Stats
**GET** `/api/admin/stats`

### Admin: Get All Products
**GET** `/api/admin/products`

### Admin: Get Product Stats
**GET** `/api/admin/products/stats`

### Admin: Get Product by ID
**GET** `/api/admin/products/:productId`

### Admin: Create Product
**POST** `/api/admin/products`

### Admin: Update Product
**PUT** `/api/admin/products/:productId`

### Admin: Delete Product
**DELETE** `/api/admin/products/:productId`

### Admin: Update Product Status
**PUT** `/api/admin/products/:productId/status`

### Admin: Get Categories with Vendor
**GET** `/api/admin/categories-with-vendor`

### Admin: Update Category
**PUT** `/api/admin/categories/:categoryId`

### Admin: Create Category
**POST** `/api/admin/categories`

### Admin: Delete Category
**DELETE** `/api/admin/categories/:categoryId`

### Admin: Get All Vendors
**GET** `/api/admin/vendors`

### Admin: Get Pending Vendors
**GET** `/api/admin/vendors/pending`

### Admin: Create Vendor
**POST** `/api/admin/vendors`

### Admin: Get Vendor by ID
**GET** `/api/admin/vendors/:vendorId`

### Admin: Update Vendor
**PUT** `/api/admin/vendors/:vendorId`

### Admin: Update Vendor Status
**PUT** `/api/admin/vendors/:vendorId/status`

### Admin: Delete Vendor
**DELETE** `/api/admin/vendors/:vendorId`

### Admin: Get Vendor Categories
**GET** `/api/admin/vendors/:vendorId/categories`

### Admin: Update Vendor Categories
**PUT** `/api/admin/vendors/:vendorId/categories`

### Admin: Get All Users
**GET** `/api/admin/users`

### Admin: Get User by ID
**GET** `/api/admin/users/:userId`

### Admin: Update User Status
**PUT** `/api/admin/users/:userId/status`

### Admin: Get All Tags
**GET** `/api/admin/tags`

### Admin: Add Tag
**POST** `/api/admin/tags`

### Admin: Get Tag Stats
**GET** `/api/admin/tags/:tagName/stats`

### Admin: Bulk Tag Operations
**POST** `/api/admin/tags/bulk`

---

## 🧪 Testing Endpoints

### Health Check
**GET** `/health`

### Test Token Generation
**POST** `/test/generate-token`

**Request Body:**
```json
{
  "email": "test@example.com"
}
```

---

## 📝 Data Models

### User Model
```json
{
  "firebaseUid": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "authProvider": "email|google|apple",
  "profileImage": "string",
  "gender": "Male|Female|Other",
  "dob": "date",
  "address": "string",
  "city": "string",
  "state": "string",
  "pincode": "string",
  "country": "string",
  "role": "user|vendor|admin",
  "isVerified": "boolean",
  "favorites": ["product_ids"],
  "reviews": ["review_ids"],
  "messagesSent": ["message_ids"],
  "orders": ["order_ids"],
  "status": "active|inactive|suspended",
  "fcmToken": "string",
  "lastLoginAt": "date"
}
```

### Vendor Model
```json
{
  "firebaseUid": "string",
  "title": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "rating": "number",
  "reviewCount": "number",
  "license": "string",
  "about": "string",
  "credentials": ["string"],
  "location": {
    "pincode": "string",
    "city": "string",
    "state": "string",
    "geo": {
      "type": "Point",
      "coordinates": [longitude, latitude]
    }
  },
  "categories": ["string"],
  "style": "string",
  "projectTypes": ["Residential", "Commercial", "Industrial", "Hospitality", "Healthcare", "Educational", "Retail", "Office"],
  "styles": ["Modern", "Traditional", "Contemporary", "Minimalist", "Industrial", "Scandinavian", "Indian", "European", "Bohemian", "Art Deco", "Mediterranean", "Rustic"],
  "businessHighlights": ["string"],
  "languages": ["string"],
  "budgetLevel": "Low|Medium|High",
  "images": {
    "profileImage": "string",
    "coverImage": "string"
  },
  "portfolioData": [{
    "projectName": "string",
    "projectImages": ["string"],
    "projectDescription": "string",
    "projectType": "string",
    "projectLocation": "string"
  }],
  "role": "vendor",
  "status": "active|inactive|suspended|pending",
  "isVerified": "boolean",
  "isJoinCompleted": "boolean",
  "rejectionReason": "string"
}
```

### Product Model
```json
{
  "name": "string",
  "category": "string",
  "vendorId": "object_id",
  "vendorName": "string",
  "priceRange": {
    "min": "number",
    "max": "number",
    "currency": "INR"
  },
  "shortDescription": "string",
  "fullDescription": "string",
  "thumbnailImage": {
    "url": "string",
    "public_id": "string",
    "type": "image|video"
  },
  "gallery": [{
    "url": "string",
    "public_id": "string",
    "type": "image|video"
  }],
  "features": ["string"],
  "exclusions": ["string"],
  "serviceAvailability": "Weekdays|Weekends|24x7",
  "consultationFee": "number",
  "customizablePackages": "boolean",
  "materialsUsed": ["string"],
  "dimensions": {
    "length": "number",
    "width": "number",
    "height": "number",
    "unit": "cm"
  },
  "durationEstimate": "string",
  "availableColors": ["string"],
  "productFeatures": ["string"],
  "tags": ["string"],
  "location": {
    "serviceableAreas": ["string"],
    "cities": ["string"]
  },
  "rating": "number",
  "reviewCount": "number",
  "status": "active|inactive|draft",
  "views": "number"
}
```

### Category Model
```json
{
  "title": "string",
  "slug": "string",
  "description": "string",
  "imageUrl": "string",
  "type": "room|service|style|feature|design|other",
  "isActive": "boolean",
  "displayOrder": "number",
  "createdBy": "object_id",
  "categoryType": "platform|vendor",
  "isGlobal": "boolean",
  "vendorId": "object_id",
  "metadata": {
    "seoTitle": "string",
    "seoDescription": "string",
    "tags": ["string"]
  }
}
```

---

## 🔒 Authentication & Authorization

### User Roles
- **user**: Regular platform users
- **vendor**: Service providers
- **admin**: Platform administrators
- **superadmin**: Super administrators

### Permission Levels
- **Public**: No authentication required
- **Authenticated**: Valid Firebase token required
- **Role-based**: Specific role required (user, vendor, admin, superadmin)

### Token Format
```
Authorization: Bearer <firebase-id-token>
```

---

## 📁 File Upload Guidelines

### Supported File Types
- **Images**: JPG, JPEG, PNG, GIF, WebP
- **Videos**: MP4, MOV, AVI, WebM
- **Documents**: PDF, DOC, DOCX

### File Size Limits
- **Images**: 5MB maximum
- **Videos**: 100MB maximum
- **Documents**: 10MB maximum

### Upload Endpoints
- Use FormData for file uploads
- Multiple files supported where specified
- Files are processed and stored in Cloudinary

---

## 🚨 Error Handling

### Common HTTP Status Codes
- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **422**: Validation Error
- **500**: Internal Server Error

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"],
  "validationDetails": [
    {
      "field": "field_name",
      "message": "validation error message",
      "value": "invalid_value"
    }
  ]
}
```

---

## 🔄 Rate Limiting

- **Rate Limit**: 100 requests per 15 minutes per IP
- **Headers**: Rate limit information included in response headers
- **Exceeded**: Returns 429 status code

---

## 📱 CORS Configuration

### Allowed Origins
- `http://localhost:5173`
- `http://localhost:3000`
- `http://127.0.0.1:5173`
- `http://localhost:5174`
- `http://localhost:5175`
- `https://interior-frontend-two.vercel.app`
- `https://interior-admin-three.vercel.app`
- `https://interior-vendor-dashboard-bcht.vercel.app`
- `https://www.godecormate.com`
- `https://www.admin.godecormate.com`

### Allowed Methods
- GET, POST, PUT, DELETE, OPTIONS

### Allowed Headers
- Content-Type, Authorization, X-Requested-With, Accept, Origin

---

## 🛠️ Development Setup

### Environment Variables
```env
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb://localhost:27017/interior-platform
JWT_SECRET=your-jwt-secret
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY=your-firebase-private-key
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### Installation
```bash
npm install
npm run dev
```

### Testing
```bash
npm test
```

---

## 📞 Support

For API support and questions:
- **Email**: support@example.com
- **Documentation**: This file
- **Status**: Check `/health` endpoint

---

*Last Updated: December 2024*
*API Version: 1.0.0*
