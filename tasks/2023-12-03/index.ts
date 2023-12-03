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

	let najwyzszaWartosc: number | null = null;
	let najwyzszaLokalizacja: Lokalizacja | null = null;

	for (const lokalizacja of lokalizacje) {
		const {x, y, z, czas} = lokalizacja
		const wartoscMapy = mapa(x, y, z, czas);

		if (!isFinite(wartoscMapy)) {
			return null;
		}

		if (najwyzszaWartosc === null || wartoscMapy > najwyzszaWartosc) {
			najwyzszaWartosc = wartoscMapy;
			najwyzszaLokalizacja = lokalizacja;
		}
	}

	return najwyzszaLokalizacja;
}
