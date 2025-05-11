import { Stack } from "expo-router";

export default function HomeLayout() {
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: "#f4511e",
				},
				headerTintColor: "#fff",
				headerTitleStyle: {
					fontWeight: "bold",
				},
			}}>
			<Stack.Screen
				name="index"
				options={{
					title: "Math Game",
					headerTitleAlign: "center",
					headerTitleStyle: {
						fontSize: 24,
						fontWeight: "bold",
					},
				}}
			/>
			{/* <Stack.Screen name="details" /> */}
		</Stack>
	);
}
