import { createContext, useState } from 'react';
import {
	obtenerDiferenciaYear,
	calcularMarca,
	calcularPlan,
	formatearDinero,
} from '../helpers';

const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {
	const [datos, setDatos] = useState({
		marca: '',
		year: '',
		plan: '',
	});
	const [error, setError] = useState(false);
	const [resultado, setResultado] = useState(0);
	const [cargando, setCargando] = useState(false);

	const handleChangeDatos = e => {
		setDatos({
			...datos,
			[e.target.name]: e.target.value,
		});
	};

	const cotizarSeguro = () => {
		// Base
		let base = 2000;

		// Diferencia de Años
		const diferencia = obtenerDiferenciaYear(datos.year);

		// Hay que restar el 3% por cada año
		base -= (diferencia * 3 * base) / 100;

		// Sumarle a la base dependiendo la marca (Europeo 30% || Americano 15% || Asiatico 5%)
		base *= calcularMarca(datos.marca);

		// Sumarle a la base dependiendo el plan (Basico 20% || Completo 50%)
		base *= calcularPlan(datos.plan);

		// Formatear Dinero
		base = formatearDinero(base);

		// Asignamos el precio
		setCargando(true);
		setTimeout(() => {
			setResultado(base);
			setCargando(false);
		}, 3000);
	};

	return (
		<CotizadorContext.Provider
			value={{
				datos,
				handleChangeDatos,
				error,
				setError,
				cotizarSeguro,
				resultado,
				cargando,
			}}
		>
			{children}
		</CotizadorContext.Provider>
	);
};

export { CotizadorProvider };

export default CotizadorContext;
