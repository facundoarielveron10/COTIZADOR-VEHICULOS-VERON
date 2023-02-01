import { Fragment } from 'react';
import { MARCAS, YEARS, PLANES } from '../constants';
import useCotizador from '../hooks/useCotizador';
import Error from './Error';

export default function Formulario() {
	const { datos, handleChangeDatos, error, setError, cotizarSeguro } =
		useCotizador();

	const handleSubmit = e => {
		e.preventDefault();

		if (Object.values(datos).includes('')) {
			setError('Todos los campos son obligatorios');
			return;
		}

		setError('');
		cotizarSeguro();
	};

	return (
		<>
			{error && <Error />}
			<form onSubmit={handleSubmit}>
				{/* Marca */}
				<div className="my-5">
					<label
						className="block mb-3 font-bold text-gray-400 uppercase"
						htmlFor="marca"
					>
						Marca
					</label>
					<select
						className="w-full p-3 bg-white border border-gray-200"
						name="marca"
						id="marca"
						onChange={e => handleChangeDatos(e)}
						value={datos.marca}
					>
						<option value="">-- Seleccionar Marca --</option>

						{MARCAS.map(marca => (
							<option key={marca.id} value={marca.id}>
								{marca.nombre}
							</option>
						))}
					</select>
				</div>
				{/* AÑO */}
				<div className="my-5">
					<label
						className="block mb-3 font-bold text-gray-400 uppercase"
						htmlFor="year"
					>
						Año
					</label>
					<select
						className="w-full p-3 bg-white border border-gray-200"
						name="year"
						id="year"
						onChange={e => handleChangeDatos(e)}
						value={datos.year}
					>
						<option value="">-- Seleccionar Año --</option>

						{YEARS.map(year => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
				</div>
				{/* PLANES */}
				<div className="my-5">
					<label className="block mb-3 font-bold text-gray-400 uppercase">
						Planes
					</label>
					<div className="flex gap-3 items-center">
						{PLANES.map(plan => (
							<Fragment key={plan.id}>
								<label htmlFor={plan.nombre}>
									{plan.nombre}
								</label>
								<input
									type="radio"
									name="plan"
									id={plan.nombre}
									value={plan.id}
									onChange={e => handleChangeDatos(e)}
								/>
							</Fragment>
						))}
					</div>
				</div>

				<input
					className="w-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-white cursor-pointer p-3 uppercase font-bold"
					type="submit"
					value="Cotizar"
				/>
			</form>
		</>
	);
}
