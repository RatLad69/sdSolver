import { useEffect, useState } from "react";
import "./App.css";

function NumSquare({
	value,
	location,
	updateNum,
}: {
	value: number;
	location: number;
	updateNum: (idx: number, nextVal: number) => void;
}) {
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		updateNum(location, parseFloat(e.target.value));
	}

	return (
		<div
			className="num-square"
			// onClick={() => console.log(location + ": " + value)}
		>
			{/* {value.toString()} */}
			<input
				type="number"
				value={value}
				max={9}
				min={1}
				onChange={handleChange}
			></input>
		</div>
	);
}

function NumGrid({
	values,
	cols,
	updateNum,
}: {
	values: number[];
	cols: number;
	updateNum: (idx: number, nextVal: number) => void;
}) {
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
									location={cols * i + j}
									key={cols * i + j} // key/location == index of value in values array
									// location={10 * (i + 1) + j + 1}
									// key={10 * (i + 1) + j + 1} // First digit of key is row; second is column
									updateNum={updateNum}
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

	function updateNum(idx: number, nextVal: number) {
		const nextVals = testVals.map((val, i) => {
			if (i === idx) {
				return nextVal;
			} else {
				return val;
			}
		});
		setTestVals(nextVals);
	}

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
			<NumGrid values={testVals} cols={9} updateNum={updateNum}></NumGrid>
			<div>{testVals}</div>
			<div>{testTxt}</div>
		</>
	);
}

export default App;
