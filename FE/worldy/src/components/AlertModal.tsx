import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger',
  },
  buttonsStyling: false,
});

swalWithBootstrapButtons
  .fire({
    title: '정말로 그렇게 하시겠습니까?',
    text: '확인 처리 준비 중...',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    confirmButtonColor: 'rgba[(0,0,225,1)]',
    cancelButtonText: 'No, cancel!',
    cancelButtonColor: 'rgba[(225,0,0,1)]',
    reverseButtons: true,
  })
  .then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        '확인!',
        '정상적으로 처리되었습니다.',
        'success'
      );
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire('취소', '취소되었습니다.', 'error');
    }
  });
