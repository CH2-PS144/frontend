function addClass() {
  const classNameValue = $("#className").val();

  $.ajax({
    type: "POST",
    url: "http://34.87.40.161/api/class",
    contentType: "application/json",
    data: JSON.stringify({ name: classNameValue }),
    success: function (response) {
      setTimeout(() => {
        alert("sukses nenambah data kelas!");
      }, 50);
      loadClassList();
      loadClassDropdown();
    },
    error: function (error) {
      setTimeout(() => {
        alert("gagal data kelas!");
      }, 50);
    },
  });
}

function updateClass(classId) {
  const updatedClassName = prompt("Enter the updated class name:", "");

  if (updatedClassName !== null) {
    $.ajax({
      type: "PATCH",
      url: `http://34.87.40.161/api/class/${classId}`,
      contentType: "application/json",
      data: JSON.stringify({ name: updatedClassName }),
      success: function (response) {
        setTimeout(() => {
          alert("sukses ubah data kelas!");
        }, 50);
        loadClassList();
        loadClassDropdown();
      },
      error: function (error) {
        setTimeout(() => {
          alert("gagal nenambah data kelas!");
        }, 50);
      },
    });
  }
}

function loadClassList() {
  $.ajax({
    type: "GET",
    url: "http://34.87.40.161/api/class",
    success: function (response) {
      const classes = response.class;
      const $classList = $("#classList");
      $classList.empty();

      classes.forEach(function (cls) {
        const listItem = `<li class="list-group-item">${cls.name}
                    <button class="btn btn-danger btn-sm ml-2" onclick="deleteClass('${cls.id}')">Hapus</button>
                    <button class="btn btn-warning btn-sm ml-2" onclick="updateClass('${cls.id}')">Ubah</button>
                </li>`;
        $classList.append(listItem);
      });
    },
    error: function (error) {
      setTimeout(() => {
        alert("gagal load data kelas!");
      }, 50);
    },
  });
}

function loadClassDropdown() {
  $.ajax({
    type: "GET",
    url: "http://34.87.40.161/api/class",
    success: function (response) {
      const classes = response.class;
      const $classDropdown = $("#classDropdown");
      $classDropdown.empty();

      classes.forEach(function (cls) {
        $classDropdown.append(`<option value="${cls.id}">${cls.name}</option>`);
      });
    },
    error: function (error) {
      setTimeout(() => {
        alert("gagal load data kelas!");
      }, 50);
    },
  });
}

function deleteClass(classId) {
  $.ajax({
    type: "DELETE",
    url: `http://34.87.40.161/api/class/${classId}`,
    success: function (response) {
      setTimeout(() => {
        alert("sukses hapus data kelas!");
      }, 50);

      loadClassList();
      loadClassDropdown();
    },
    error: function (error) {
      setTimeout(() => {
        alert("gagal hapus data kelas!");
      }, 50);
    },
  });
}

$(document).ready(function () {
  loadClassList();
  loadClassDropdown();
});
