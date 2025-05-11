import React, { useEffect, useState } from "react";
import {
	Button,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
} from "react-native";

export default function App() {
	const [num1, setNum1] = useState(0);
	const [num2, setNum2] = useState(0);
	const [level, setLevel] = useState(1); // 1 = units, 2 = tens, 3 = hundreds
	const [input, setInput] = useState("");
	const [message, setMessage] = useState("");
	const [timeLeft, setTimeLeft] = useState(10);
	const [started, setStarted] = useState(false);
	const [questionCount, setQuestionCount] = useState(0);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(false);

	useEffect(() => {
		if (!started || gameOver) return;

		if (timeLeft <= 0) {
			checkAnswer();
			return;
		}

		const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
		return () => clearTimeout(timer);
	}, [timeLeft, started]);

	const startGame = () => {
		setScore(0);
		setQuestionCount(0);
		setGameOver(false);
		setStarted(true);
		generateQuestion();
	};

	const quitGame = () => {
		setStarted(false);
		setMessage("Game quit!");
		setInput("");
	};

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
		setTimeLeft(10);
		setMessage("");
		setQuestionCount((prev) => prev + 1);
	};

	const checkAnswer = () => {
		const correct = num1 + num2;
		if (parseInt(input) === correct) {
			setScore((prev) => prev + 1);
			setMessage("✅ Correct!");
		} else {
			setMessage(`❌ Wrong! Answer: ${correct}`);
		}
		setTimeout(generateQuestion, 1000);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}>
			{!started && !gameOver && (
				<Button title="Start Game" onPress={startGame} />
			)}

			{started && (
				<>
					<Text style={styles.timer}>Time left: {timeLeft}</Text>
					<Text style={styles.counter}>Question {questionCount}/10</Text>
					<Text style={styles.question}>
						{num1} + {num2} = ?
					</Text>
					<TextInput
						keyboardType="numeric"
						value={input}
						onChangeText={setInput}
						style={styles.input}
					/>
					<view
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "space-between",
							gap: 10,
						}}>
						<Button title="Submit" onPress={checkAnswer} />
						<Button title="Quit" onPress={quitGame} color="red" />
					</view>
					<Text style={styles.message}>{message}</Text>
				</>
			)}

			{gameOver && (
				<>
					<Text style={styles.score}>🎉 Game Over! Your score: {score}/10</Text>
					<Button title="Play Again" onPress={startGame} />
				</>
			)}
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#121212", // Dark background color
	},
	question: {
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#ffffff",
	},
	input: {
		borderWidth: 1,
		borderColor: "#999",
		borderRadius: 8,
		padding: 10,
		width: 160,
		fontSize: 20,
		textAlign: "center",
		marginBottom: 10,
		backgroundColor: "#ffffff",
		color: "#000000",
	},
	timer: { fontSize: 20, marginBottom: 10, color: "#ffffff" },
	message: { fontSize: 20, marginTop: 20, fontWeight: "600", color: "#ffffff" },
	score: { fontSize: 24, marginTop: 20, fontWeight: "bold", color: "#f4511e" },
	counter: { fontSize: 18, marginBottom: 10, color: "#ffffff" },
});
