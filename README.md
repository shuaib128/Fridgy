# 🥬 Fridgy

**Fridgy** is a mobile food inventory and meal-planning app that helps you keep track of what is in your fridge, reduce food waste, and decide what to cook using the ingredients you already have.

Built with **React Native** and **Expo**, Fridgy is designed around a warm, friendly neumorphic interface with clear inventory insights, expiration reminders, meal suggestions, and shopping support.

---

## ✨ What Fridgy Does

Fridgy helps answer the everyday questions:

- What food do I currently have?
- What is running low?
- What is about to expire?
- What meals can I make right now?
- Which ingredients should I use first?
- What am I missing for a recipe?
- Where can I buy missing items?
- How much might those items cost?

The goal is simple: **use more of what you already own, waste less food, and make meal planning easier.**

---

## 📱 Core Features

### 🧊 Smart Inventory

Track food stored in your fridge, freezer, and pantry.

Each inventory item can include:

- Item name
- Quantity
- Category
- Expiration status
- Food icon
- Urgency indicators
- Low-stock status

Items that are close to expiring are visually highlighted so they are easy to notice.

### 🍽️ Meal Suggestions

Discover meal ideas based on the ingredients currently available in your kitchen.

Meal cards include:

- Ingredient match percentage
- Cooking time
- Number of servings
- Required ingredients
- Missing ingredient count
- Expiring-food recommendations
- Save and bookmark support

Meals can be filtered by categories such as:

- For you
- Quick
- Use soon
- High protein

### ⏰ Expiration Awareness

Fridgy helps prioritize ingredients that should be used soon.

The app is designed to surface:

- Food expiring today
- Food expiring within a few days
- Ingredients that can be combined into a meal
- Suggested actions before food goes to waste

### 🛒 Shopping Assistance

Planned shopping features include:

- Automatic shopping lists
- Missing recipe ingredients
- Low-stock reminders
- Nearby store suggestions
- Estimated item prices
- Cost comparison between stores

### 🔖 Saved Meals

Users can bookmark meals they want to prepare later and quickly return to them from the meal screen.

### 👋 Personalized Home Screen

The home screen provides a quick daily overview, including:

- Personalized greeting
- Current inventory summary
- Expiring food
- Low-stock ingredients
- Suggested meals
- Important fridge activity

---

## 🎨 Design System

Fridgy uses a custom visual system built specifically for the app.

The interface follows a soft **neumorphic-inspired design** with:

- Warm cream backgrounds
- Large rounded white surfaces
- Olive-green primary actions
- Golden-yellow accents
- Soft shadows
- Pill-shaped controls
- Circular icon badges
- Bold dark-green headings
- Muted olive secondary text
- Clear selected and urgent states

All application colors, spacing, typography, icon sizes, radii, shadows, and opacity values are managed through a shared theme.

### Main Brand Colors

| Token | Color | Purpose |
|---|---:|---|
| Primary | `#6E8434` | Main brand and selected states |
| Primary Dark | `#4F6423` | Strong actions and headings |
| Accent | `#FCC151` | Highlights and callouts |
| Background | `#FFFFEA` | Main app background |
| Surface | `#FFFFFF` | Cards and elevated content |
| Text | `#1E2A00` | Primary text |
| Error | `#C45446` | Urgent and expiration states |

---

## 🛠️ Tech Stack

- **React Native**
- **Expo**
- **Expo Router**
- **TypeScript**
- **React Hooks**
- **React Native Safe Area Context**
- **Expo Vector Icons**
- **Custom shared theme system**

---

## 📂 Project Structure

```text
fridgy/
├── assets/
│   ├── images/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── (tabs)/
│   │   ├── onboarding/
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   ├── components/
│   │   ├── navigation/
│   │   ├── screen.tsx
│   │   ├── inventory-item-card.tsx
│   │   └── meal-card.tsx
│   └── styles/
│       └── theme.ts
├── app.json
├── package.json
├── package-lock.json
└── README.md
```

The exact structure may continue to evolve as more app features are implemented.

---

## 🚀 Getting Started

### Prerequisites

Install the following tools:

- [Node.js](https://nodejs.org/)
- npm
- Expo tooling
- Xcode for iOS development
- Android Studio for Android development, if needed

### 1. Clone the Repository

```bash
git clone https://github.com/shuaib128/Fridgy.git
cd Fridgy
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Expo Development Server

```bash
npx expo start
```

### 4. Run the App

For iOS Simulator:

```bash
npm run ios
```

For Android:

```bash
npm run android
```

For web:

```bash
npm run web
```

You can also scan the Expo QR code with a compatible development build on your phone.

---

## 📲 Running on a Physical iPhone

Fridgy can be installed and tested on a personal iPhone without publishing it to the App Store.

A typical local development flow is:

```bash
npx expo run:ios --device
```

You may need to:

1. Connect the iPhone to the Mac.
2. Enable Developer Mode on the iPhone.
3. Select your Apple development team in Xcode.
4. Trust the developer certificate on the device.
5. Build and launch the app.

An Apple Developer Program subscription is generally only required for App Store distribution and some longer-term signing workflows.

---

## 🧩 Reusable Components

Fridgy is being built with reusable components to keep screens clean and consistent.

Current component patterns include:

- `Screen`
- `PageHeader`
- `InventoryItemCard`
- `MealCard`
- Custom tab navigation
- Reusable filter chips
- Status badges
- Rounded action buttons
- Empty-state cards

The shared `Screen` component supports:

- Scrollable and non-scrollable layouts
- Optional content padding
- Keyboard avoidance
- Safe-area control
- Custom background colors
- Header and footer slots
- Pull-to-refresh
- Forwarded scroll references

---

## 🧭 Planned Screens

The current and planned Fridgy experience includes:

- Onboarding
- Home
- Inventory
- Add food
- Food details
- Meal ideas
- Meal details
- Saved meals
- Shopping list
- Nearby stores
- Expiring soon
- Low stock
- Notifications
- Profile
- Settings

---

## 🗺️ Roadmap

### Phase 1 — App Foundation

- [x] Expo project setup
- [x] Shared theme system
- [x] Reusable screen wrapper
- [x] Onboarding flow
- [x] Custom tab navigation
- [x] Initial home screen
- [x] Inventory card component
- [x] Meal card component
- [x] Meal filtering
- [x] Saved-meal state

### Phase 2 — Inventory Management

- [ ] Add food manually
- [ ] Edit inventory items
- [ ] Delete inventory items
- [ ] Quantity tracking
- [ ] Category filtering
- [ ] Expiration-date picker
- [ ] Low-stock detection
- [ ] Search inventory

### Phase 3 — Meal Intelligence

- [ ] Recipe detail screen
- [ ] Ingredient matching
- [ ] Recipe recommendations
- [ ] Expiring-food prioritization
- [ ] Dietary preferences
- [ ] Meal preparation planning
- [ ] Persistent saved meals

### Phase 4 — Shopping Support

- [ ] Shopping list generation
- [ ] Missing ingredient detection
- [ ] Store search
- [ ] Price estimates
- [ ] Store comparison
- [ ] Completed shopping history

### Phase 5 — Data and Notifications

- [ ] Local database
- [ ] Cloud synchronization
- [ ] Account support
- [ ] Expiration notifications
- [ ] Low-stock notifications
- [ ] Inventory history
- [ ] Backup and restore

---

## 💡 Product Vision

Fridgy is more than an inventory tracker.

The long-term vision is to create a helpful kitchen companion that understands:

- What food the user owns
- How much is left
- What should be used soon
- What meals are possible
- Which groceries are missing
- Where those groceries can be purchased
- How much the next meal may cost

Fridgy should make opening the fridge feel less like guesswork and more like having a personal kitchen assistant.

---

## 🤝 Contributing

Fridgy is currently a personal project and is under active development.

Suggestions, bug reports, and improvement ideas are welcome through GitHub Issues.

When contributing:

1. Create a new branch.
2. Keep components reusable.
3. Use the shared Fridgy theme.
4. Avoid introducing colors outside the existing design tokens.
5. Follow the established neumorphic visual pattern.
6. Use clear and descriptive commit messages.
7. Open a pull request with a summary of the changes.

---

## 🧪 Development Guidelines

- Use TypeScript for all new files.
- Keep shared types in reusable component or model files.
- Avoid duplicating interfaces across screens.
- Keep screen files focused on data, state, and navigation.
- Move large visual sections into reusable components.
- Use the shared `theme` object for styling.
- Add accessibility labels to interactive elements.
- Keep touch targets large enough for mobile use.
- Use `FlatList` for scalable lists.
- Keep nested button actions from triggering parent presses.
- Preserve consistent spacing, shadows, typography, and radii.

---

## 📸 Screenshots

Screenshots and product previews will be added as the interface continues to develop.

```text
Coming soon:
• Onboarding
• Home dashboard
• Inventory
• Meal recommendations
• Shopping list
```

---

## 🔐 Privacy

Fridgy is intended to handle personal food inventory and preference data responsibly.

Future versions should follow these principles:

- Collect only necessary information
- Keep user inventory private
- Clearly explain any location usage
- Ask before enabling notifications
- Avoid sharing personal data with retailers
- Provide data export and deletion options

---

## 👨‍💻 Author

**Shuaib Ahamed**

- GitHub: [@shuaib128](https://github.com/shuaib128)
- Portfolio: [shuaib.pw](https://shuaib.pw)

---

## 📄 License

This project is currently maintained as a personal application.

A formal open-source license may be added later. Until then, all rights are reserved by the project owner.

---

<p align="center">
  <strong>Waste less. Cook smarter. Keep your fridge under control. 🥬</strong>
</p>
