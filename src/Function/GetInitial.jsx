function getInitial(name, isLongInitial = false) {
    if (isLongInitial) {
        const words = name.split(" ");  // Membagi nama berdasarkan spasi
        let initials = "";
        words.forEach(word => {
            initials += word.charAt(0).toUpperCase();  // Ambil huruf pertama dan jadikan kapital
        });

        return initials;
    } else {
        return name.charAt(0).toUpperCase();
    }
}

export { getInitial }