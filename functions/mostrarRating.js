export default function mostrarRating(rating) {
  const lleno = Math.floor(rating);   
  const estrellas = [];
  for (let i = 0; i < lleno; i++) {
    estrellas.push("★");
  }
  return estrellas.join(" ");
}

