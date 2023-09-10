function convertirMinutosATiempo(minutos) {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
  
    // Formatear el resultado como una cadena en el formato 'HH:MM:SS'
    const tiempoFormateado = `${String(horas).padStart(2, "0")}:${String(
      minutosRestantes
    ).padStart(2, "0")}:00`;
  
    return tiempoFormateado;
  }
  module.exports = convertirMinutosATiempo;