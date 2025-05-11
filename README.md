# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# 🧠 React Native Math Quiz Game (Expo)

This is a simple arithmetic quiz game built with **React Native** using **Expo**. The app presents the user with 10 addition questions one by one, and each must be answered within 5 seconds.

---

## 🔧 1. State Variables

These `useState` hooks manage the app's logic and behavior:

```js
const [num1, setNum1] = useState(0); // First random number
const [num2, setNum2] = useState(0); // Second random number
const [input, setInput] = useState(""); // User's typed answer
const [message, setMessage] = useState(""); // Feedback message
const [timeLeft, setTimeLeft] = useState(5); // Countdown timer
const [started, setStarted] = useState(false); // Has the game started?
const [questionCount, setQuestionCount] = useState(0); // Current question number
const [score, setScore] = useState(0); // Correct answers tally
const [gameOver, setGameOver] = useState(false); // Is the game finished?
```

---

## ⏱️ 2. Timer Logic (`useEffect`)

The countdown timer logic decreases `timeLeft` every second and auto-submits the answer when it hits 0:

```js
useEffect(() => {
	if (!started || gameOver) return;

	if (timeLeft <= 0) {
		checkAnswer(); // Auto-check when timer hits 0
		return;
	}

	const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
	return () => clearTimeout(timer); // Cleanup
}, [timeLeft, started]);
```

---

## ▶️ 3. startGame()

This function starts a new game session:

```js
const startGame = () => {
	setScore(0);
	setQuestionCount(0);
	setGameOver(false);
	setStarted(true);
	generateQuestion();
};
```

---

## 🎲 4. generateQuestion()

Generates a new addition question and resets relevant states:

```js
const generateQuestion = () => {
	if (questionCount >= 10) {
		setStarted(false);
		setGameOver(true);
		return;
	}

	const a = Math.floor(Math.random() * 50);
	const b = Math.floor(Math.random() * 50);

	setNum1(a);
	setNum2(b);
	setInput("");
	setTimeLeft(5);
	setMessage("");
	setQuestionCount((prev) => prev + 1);
};
```

---

## ✅ 5. checkAnswer()

Evaluates the user's input and gives feedback:

```js
const checkAnswer = () => {
	const correct = num1 + num2;
	if (parseInt(input) === correct) {
		setScore((prev) => prev + 1);
		setMessage("✅ Correct!");
	} else {
		setMessage(`❌ Wrong! Answer: ${correct}`);
	}

	setTimeout(generateQuestion, 1000); // Move to next after short delay
};
```

---

## 🧱 6. UI Layout

### 🔹 Before Game Starts:

```jsx
{
	!started && !gameOver && <Button title="Start Game" onPress={startGame} />;
}
```

### 🔸 During the Game:

```jsx
{
	started && (
		<>
			<Text>Time left: {timeLeft}</Text>
			<Text>
				{num1} + {num2} = ?
			</Text>
			<TextInput
				value={input}
				onChangeText={setInput}
				keyboardType="numeric"
				style={styles.input}
			/>
			<Button title="Submit" onPress={checkAnswer} />
			<Text>{message}</Text>
		</>
	);
}
```

### 🟥 After Game Ends:

```jsx
{
	gameOver && (
		<>
			<Text>Your score: {score} / 10</Text>
			<Button title="Play Again" onPress={startGame} />
		</>
	);
}
```

---

## 🎨 7. Styling

Basic styles using `StyleSheet.create()`:

```js
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#f0f0f0",
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		paddingHorizontal: 10,
		marginVertical: 10,
		width: "80%",
		textAlign: "center",
	},
});
```

---

## 🚀 Run the App

1. Install Expo CLI if you haven’t:

```bash
npm install -g expo-cli
```

2. Start the app:

```bash
expo start
```

Then scan the QR code with your Expo Go app.

---

Enjoy building and learning!

## updated to add a new feature

feature added
score
quit
