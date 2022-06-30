Swal.fire({
    html: 'Por favor acepta nuestros <a href="#">Términos & Condiciones<a/>',
    confirmButtonText: 'Acepto',
    icon: 'info',
    padding: '1rem',
    grow: 'row',
    backdrop: true,
    toast: true,
    position: 'bottom',
    allowOutsideClick: true,
    stopKeydownPropagation: false,
    showConfirmButton: true,
    showCancelButton: false,
    showCloseButton: false,
    closeButtonAriaLabel: 'Cerrar esta alerta',

    customClass:{
        content: 'content-class'
    }
  })