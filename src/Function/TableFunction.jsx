function getColumnNames(data) {
    if (data.length === 0) return ["no data object [clue: data must be [{}, {}, {}]"];
    // Ambil kolom dari objek pertama, kemudian ubah menjadi array
    return Object.keys(data[0]);
}

export { getColumnNames }