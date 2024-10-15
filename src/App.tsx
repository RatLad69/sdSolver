import { useEffect, useState } from "react";
import "./App.css";

function NumSquare({ value }: { value: number }) {
	return <div className="num-square">{value.toString()}</div>;
}

function SmallGrid({ values }: { values: number[] }) {
	// return values.map((value, i) => (
	// 	<NumSquare value={value} key={i}></NumSquare>
	// ));
	let rows = [];
	const numsPerRow = 3;
	let row = [];
	for (let i = 0; i < Math.floor(values.length / numsPerRow); i++) {
		row = [];
		for (let j = 0; j < numsPerRow; j++) {
			row.push(values[numsPerRow * i + j]);
		}
		rows.push(row);
	}

	return (
		<table>
			{rows.map((r, i) => (
				<tr key={i}>
					{r.map((value, j) => (
						<td key={j}>
							<NumSquare value={value}></NumSquare>
						</td>
					))}
				</tr>
			))}
		</table>
	);
}

function App() {
	let [testVals, setTestVals] = useState([1, 2, 3]);
	useEffect(() => {
		setTestVals([2, 3, 4, 5, 6, 7, 8, 9, 1]);
	}, []);
	return (
		<>
			<SmallGrid values={testVals}></SmallGrid>
			<div>{"banana"}</div>
		</>
	);
}

export default App;
