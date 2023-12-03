export type Lokalizacja = {
	x: number;
	y: number;
	z: number;
	czas: number;
}

export type MapaCzasoprzestrzenna = (x: number, y: number, z: number, czas: number) => number

export function znajdzWorek(lokalizacje: Lokalizacja[], mapa: MapaCzasoprzestrzenna): Lokalizacja | null {
	if (!lokalizacje.length) {
		return null;
	}

	let najwyzszaLokalizacja: {wartosc?: number, lokalizacja: Lokalizacja | null} = {
		lokalizacja: null
	};

	for (const lokalizacja of lokalizacje) {
		const wartoscMapy = mapa(lokalizacja.x, lokalizacja.y, lokalizacja.z, lokalizacja.czas);

		if (isNaN(wartoscMapy)) {
			return null;
		}

		if (najwyzszaLokalizacja.wartosc === undefined) {
			najwyzszaLokalizacja = {
				wartosc: wartoscMapy,
				lokalizacja: lokalizacja
			}
			break;
		}

		if (wartoscMapy > najwyzszaLokalizacja.wartosc) {
			najwyzszaLokalizacja = {
				wartosc: wartoscMapy,
				lokalizacja: lokalizacja
			}
		}
	}

	return najwyzszaLokalizacja.lokalizacja
}
