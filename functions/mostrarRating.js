export default function mostrarRating(rating) {
  const lleno = Math.floor(rating);   
  const mitad = rating % 1 !== 0;      
  const stars = [];
  for (let i = 0; i < lleno; i++) {
    stars.push("★");
  }

  if (mitad) {
    stars.push("⯨"); 
  }

  return stars.join(" ");
}

