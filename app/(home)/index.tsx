import React, { useEffect, useState } from "react";
import {
	Button,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
} from "react-native";

export default function Index() {
	const [num1, setNum1] = useState(0);
	const [num2, setNum2] = useState(0);
	const [input, setInput] = useState("");
	const [message, setMessage] = useState("");
	const [timeLeft, setTimeLeft] = useState(5);

	useEffect(() => {
		generateQuestion();
	}, []);

	useEffect(() => {
		if (timeLeft <= 0) {
			checkAnswer();
			return;
		}

		const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
		return () => clearTimeout(timer);
	}, [timeLeft]);

	const generateQuestion = () => {
		const a = Math.floor(Math.random() * 50);
		const b = Math.floor(Math.random() * 50);
		setNum1(a);
		setNum2(b);
		setInput("");
		setTimeLeft(5);
		setMessage("");
	};

	const checkAnswer = () => {
		const correct = num1 + num2;
		if (parseInt(input) === correct) {
			setMessage("✅ Correct!");
		} else {
			setMessage(`❌ Wrong! Answer: ${correct}`);
		}
		setTimeout(generateQuestion, 2000);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}>
			<Text style={styles.timer}>⏱️ {timeLeft}s</Text>
			<Text style={styles.question}>
				{num1} + {num2} = ?
			</Text>
			<TextInput
				style={styles.input}
				keyboardType="numeric"
				value={input}
				onChangeText={setInput}
				placeholder="Your answer"
			/>
			<Button title="Submit" onPress={checkAnswer} disabled={timeLeft <= 0} />
			<Text style={styles.message}>{message}</Text>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#f0f8ff",
	},
	question: { fontSize: 32, fontWeight: "bold", marginBottom: 20 },
	input: {
		borderWidth: 1,
		borderColor: "#999",
		borderRadius: 8,
		padding: 10,
		width: 120,
		fontSize: 20,
		textAlign: "center",
		marginBottom: 10,
	},
	timer: { fontSize: 20, marginBottom: 10, color: "#333" },
	message: { fontSize: 20, marginTop: 20, fontWeight: "600" },
});
