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
	let [sdSize, setSdSize] = useState(9);

	function sendVals() {
		fetch("http://localhost:8989/api/solver", {
			method: "POST",
			body: JSON.stringify({ sdVals: vals, size: sdSize }),
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
			0, 7, 0, 5, 8, 3, 0, 2, 0, 0, 5, 9, 2, 0, 0, 3, 0, 0, 3, 4, 0, 0, 0,
			6, 5, 0, 7, 7, 9, 5, 0, 0, 0, 6, 3, 2, 0, 0, 3, 6, 9, 7, 1, 0, 0, 6,
			8, 0, 0, 0, 2, 7, 0, 0, 9, 1, 4, 8, 3, 5, 0, 7, 6, 0, 3, 0, 7, 0, 1,
			4, 9, 5, 5, 6, 7, 4, 2, 9, 0, 1, 3,
		]);
	}, []);

	return (
		<>
			<NumGrid
				values={vals}
				cols={sdSize}
				updateNum={updateNum}
			></NumGrid>
			<button onClick={sendVals}>Solve</button>
			<div>{vals}</div>
			<div>{testTxt}</div>
		</>
	);
}

export default App;
