import useCotizador from '../hooks/useCotizador';

export default function Error() {
	const { error } = useCotizador();

	return (
		<div className="flex justify-center py-3 bg-red-600 text-white font-bold text-lg rounded uppercase">
			{error}
		</div>
	);
}
