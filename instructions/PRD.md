Product Requirements Document (PRD)
Project Title:
Chembio Lifesciences - Enhancing Online Presence and Product Showcase
Objective:
Develop a professional and modern website to enhance the company's online presence, improve user approachability, and showcase the product range effectively.
________________________________________
Key Features:
Frontend
•	Framework: Next.js 14 with React 18
•	UI Components: Shadcn UI library
•	Styling: Tailwind CSS
Backend
•	API Routes: Next.js API routes
•	ORM: Drizzle
•	Database: Neon PostgreSQL
Authentication
•	Service: Clerk
Validation
•	Library: Zod for form and data validation
________________________________________
Pages and Functionalities
1. Home Page
•	Engaging landing page with company highlights.
•	Showcase key products and links to other sections of the website.
2. About Page
•	Description of the organization, its vision, and achievements.
•	Portfolio showcasing major accomplishments or partnerships.
3. Team Page
•	Details of the management and team structure.
•	Contact details of key team members.
4. Products Page
•	Key Features:
o	Products categorized by brand.
o	Displayed in card format with:
	Product Name
	Product Description
	Catalogue ID
	CAS Number
	Product Image (fetched dynamically from a URL).
	Weight/Volume Options: Dropdown or selection for different weights/volumes with corresponding prices.
o	Buttons:
1.	View Full Specification (navigates to brand page).
2.	Request Quotation.
5. Contact Page
•	Address, phone numbers, email, and contact form for inquiries.
6. Admin Dashboard
•	Admin login and authentication via Clerk.
•	CRUD operations for product management:
o	Add, edit, or delete products.
o	Manage product categories and weights/volumes.
________________________________________
Implementation Plan
Step 1: Project Setup
•	Initialize the Next.js project.
•	Configure Tailwind CSS and Shadcn UI.
•	Set up ESLint and Prettier for code consistency.
Step 2: Authentication
•	Integrate Clerk for user authentication.
•	Implement sign-up, sign-in, and role-based access control.
•	Protect admin routes.
Step 3: Database Design
•	Configure Drizzle ORM with Neon PostgreSQL.
•	Design schema for products, categories, weights/volumes, and users.
•	Perform database migrations.
Step 4: Product Management
•	Create an admin interface for CRUD operations.
•	Display products dynamically on the Products page.
Step 5: Validation
•	Use Zod for form validation.
•	Ensure data integrity for all inputs.
Step 6: Testing and Optimization
•	Write unit and integration tests.
•	Optimize images and use Next.js dynamic imports.
•	Test responsiveness and accessibility.
Step 7: Deployment
•	Configure Vercel for hosting.
•	Securely manage environment variables.
•	Verify deployment performance.
Step 8: Documentation
•	Prepare user and admin guides.
•	Document API endpoints and database schema.
________________________________________
API Endpoints
Authentication
•	Managed by Clerk; no custom endpoints required.
Products
•	GET /api/products: Fetch list of products.
•	POST /api/products: Add a new product (admin only).
•	PUT /api/products/:id: Update product details (admin only).
•	DELETE /api/products/:id: Delete a product (admin only).
Quotations
•	POST /api/quote: Submit a quotation request.



Database Schema
1. Users Table
Stores admin user credentials for login and authentication.
Column Name	Data Type	Constraints	Description
id	UUID	Primary Key, Unique	Unique identifier for the user.
username	VARCHAR(255)	Not Null, Unique	Admin username.
password_hash	VARCHAR(255)	Not Null	Hashed password for authentication.
email	VARCHAR(255)	Not Null, Unique	Admin email address.
created_at	TIMESTAMP	Default: CURRENT_TIMESTAMP	Timestamp for user creation.
________________________________________
2. Products Table
Stores product details.
Column Name	Data Type	Constraints	Description
id	UUID	Primary Key, Unique	Unique identifier for the product.
name	VARCHAR(255)	Not Null	Name of the product.
description	TEXT	Not Null	Detailed description of the product.
catalogue_id	VARCHAR(50)	Not Null, Unique	Catalogue ID of the product.
cas_number	VARCHAR(50)	Unique	CAS number for the product.
image_url	TEXT	Not Null	URL for the product image.
created_at	TIMESTAMP	Default: CURRENT_TIMESTAMP	Timestamp for product addition.
________________________________________
3. Product Variants Table
Stores details of available weights/volumes and prices for a product.
Column Name	Data Type	Constraints	Description
id	UUID	Primary Key, Unique	Unique identifier for the variant.
product_id	UUID	Foreign Key (Products.id)	Links to the product in the Products table.
weight_volume	VARCHAR(50)	Not Null	Weight/volume for the variant (e.g., "500g", "1L").
price	DECIMAL(10, 2)	Not Null	Price for the specific weight/volume.
created_at	TIMESTAMP	Default: CURRENT_TIMESTAMP	Timestamp for variant addition.
________________________________________
Relationships
1.	Products → Product Variants
o	One product can have multiple variants for different weights/volumes.
o	Use a foreign key (product_id) in the Product Variants table to establish the relationship.

