# FlexiMap – Frontend

This is the frontend for FlexiMap – a collaborative, interactive mapping platform that allows users to explore, create, and share custom maps with markers. Built using React, Leaflet, and Axios, it connects to a Django REST API.

## 🌐 Tech Stack

- React
- React Router
- Axios
- Leaflet.js (for interactive maps)
- JWT Auth (via LocalStorage)
- Docker (for deployment)

## 🔗 Related Projects

- [Backend Repository](https://github.com/Lujain702/FlexiMap-backend)

## 🚀 Live Site

[https://fleximap.onrender.com](https://fleximap.onrender.com)

## 🧭 Routing Table (React Router)

| Route | Component | Access | Purpose |
|-------|-----------|--------|---------|
| `/` | `HomePage` | Public | Landing page |
| `/login` | `LoginPage` | Public | User login |
| `/signup` | `RegisterPage` | Public | User registration |
| `/dashboard` | `UserDashboard` | Private | User's maps overview |
| `/map/new` | `MapForm` | Private | Create new map |
| `/map/:id` | `MapDetail` | Public | View map with markers |
| `/map/:id/edit` | `MapEditForm` | Private | Edit existing map |
| `/map/:id/marker/new` | `MarkerForm` | Private | Add new marker |
| `/marker/:id/edit` | `MarkerEditForm` | Private | Edit marker |
| `/marker/:id` | `MarkerDetail` | Public | View marker and comments |
| `/public-maps` | `PublicMapList` | Public | Browse shared maps |

## ⚙️ Setup Instructions

To run locally using Docker:

```bash
git clone https://github.com/your-username/FlexiMap-frontend
cd FlexiMap-frontend
docker-compose up --build

🔒 Auth Handling
JWT stored in LocalStorage

Private routes are protected using route guards (e.g., RequireAuth)

Authenticated requests are sent via Axios interceptors

❄️ Icebox Features
Map sharing (via link or code)

Custom map themes

Drawing lines and shapes (e.g., routes)

Search/filter markers by category

Offline map caching

