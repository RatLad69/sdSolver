import { useEffect, useState } from "react";
import "./App.css";

function NumSquare({ value, location }: { value: number; location: number }) {
	return (
		<div
			className="num-square"
			onClick={() => console.log(location + ": " + value)}
		>
			{value.toString()}
		</div>
	);
}

function NumGrid({ values, cols }: { values: number[]; cols: number }) {
	let rows = [];
	let row = [];
	for (let i = 0; i < Math.floor(values.length / cols); i++) {
		row = [];
		for (let j = 0; j < cols; j++) {
			row.push(values[cols * i + j]);
		}
		rows.push(row);
	}

	return (
		<table>
			<tbody>
				{rows.map((r, i) => (
					<tr key={i}>
						{r.map((value, j) => (
							<td key={j}>
								<NumSquare
									value={value}
									location={10 * (i + 1) + j + 1}
									key={10 * (i + 1) + j + 1} // First digit of key is row; second is column
								></NumSquare>
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

function App() {
	let [testVals, setTestVals] = useState([1, 2, 3]);
	let [testTxt, setTestTxt] = useState("banana");
	useEffect(() => {
		setTestVals([
			2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5,
			6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1,
			2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6,
			7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9,
		]);

		fetch("http://localhost:8989/api/solver")
			.then((response) => {
				if (!response.ok) {
					throw new Error("Response not ok");
				}
				return response.json();
			})
			.then((data) => {
				setTestTxt(data.message);
			})
			.catch((error) => {
				setTestTxt("Fetch error");
				console.error("Fetch error: ", error);
			});
	}, []);

	return (
		<>
			<NumGrid values={testVals} cols={9}></NumGrid>
			<div>{testVals}</div>
			<div>{testTxt}</div>
		</>
	);
}

export default App;
