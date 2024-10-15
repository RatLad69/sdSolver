import { useEffect, useState } from "react";
import "./App.css";

function NumSquare({ value, location }: { value: number; location: number }) {
	return (
		<div className="num-square" onClick={() => console.log(location)}>
			{value.toString()}
		</div>
	);
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
		setTestVals([2, 3, 4, 5, 6, 7, 8, 9, 1]);
	}, []);

	return (
		<>
			<SmallGrid values={testVals}></SmallGrid>
			<div>{testTxt}</div>
		</>
	);
}

export default App;
