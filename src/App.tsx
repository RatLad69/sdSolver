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
		<div className="num-square">
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
	let [vals, setVals] = useState([1, 2, 3]);
	let [testTxt, setTestTxt] = useState("banana");

	function sendVals() {
		fetch("http://localhost:8989/api/solver", {
			method: "POST",
			body: JSON.stringify({ sdVals: vals }),
		})
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
	}

	function updateNum(idx: number, nextVal: number) {
		const nextVals = vals.map((val, i) => {
			if (i === idx) {
				return nextVal;
			} else {
				return val;
			}
		});
		setVals(nextVals);
	}

	useEffect(() => {
		setVals([
			2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5,
			6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1,
			2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6,
			7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9,
		]);
	}, []);

	return (
		<>
			<NumGrid values={vals} cols={9} updateNum={updateNum}></NumGrid>
			<button onClick={sendVals}>Solve</button>
			<div>{vals}</div>
			<div>{testTxt}</div>
		</>
	);
}

export default App;
