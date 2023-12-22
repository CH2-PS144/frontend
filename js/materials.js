function addMaterial() {
  var materialNameValue = $("#materialName").val();
  var materialContentValue = tinymce.get("materialContent").getContent();
  var selectedClassId = $("#classDropdown").val();

  var requestData = {
    name: materialNameValue,
    content: materialContentValue,
    classId: selectedClassId,
  };

  $.ajax({
    type: "POST",
    url: "http://34.87.40.161/api/materials",
    contentType: "application/json",
    data: JSON.stringify(requestData),
    success: function (response) {
      setTimeout(() => {
        alert("sukses nambah data material!");
      }, 50);
      $("#materialName").val("");
      tinymce.get("materialContent").setContent("");
      loadMaterialDropdown();
      loadMaterialList();
    },

    error: function (error) {
      setTimeout(() => {
        alert("gagal nambah data material!");
      }, 50);
    },
  });
}
function loadMaterialList() {
  $.ajax({
    type: "GET",
    url: "http://34.87.40.161/api/materials",
    success: function (response) {
      var materials = response.material;
      $("#materialList").empty();
      materials.forEach(function (material) {
        $("#materialList").append(
          '<li class="list-group-item">' +
            material.name +
            '<button class="btn-danger btn-sm ml-2" onclick="deleteMaterial(\'' +
            material.id +
            "')\">Hapus</button>" +
            '<button class="btn-warning btn-sm ml-2" onclick="populateMaterialForm(\'' +
            material.id +
            "')\">Ubah</button>" +
            "</li>"
        );
      });
    },
    error: function (error) {
      setTimeout(() => {
        alert("gagal load data material!");
      }, 50);
    },
  });
}

function deleteMaterial(materialId) {
  $.ajax({
    type: "DELETE",
    url: "http://34.87.40.161/api/materials/" + materialId,
    success: function (response) {
      setTimeout(() => {
        alert("sukses hapus data material!");
      }, 50);
      loadMaterialDropdown();
      loadMaterialList();
    },
    error: function (error) {
      setTimeout(() => {
        alert("gagal nambah data material!");
      }, 50);
    },
  });
}

function updateMaterial() {
  var updatedMaterialId = $("#materialIdHidden").val();
  var updatedMaterialName = $("#materialName").val();
  var updatedMaterialContent = tinymce.get("materialContent").getContent();

  if (!updatedMaterialId) {
    setTimeout(() => {
      alert("nama data material tidak diketahui!");
    }, 50);
    return;
  }

  var updatedData = {
    id: updatedMaterialId,
    name: updatedMaterialName,
    content: updatedMaterialContent,
  };

  $.ajax({
    type: "PATCH",
    url: "http://34.87.40.161/api/materials/" + updatedMaterialId,
    contentType: "application/json",
    data: JSON.stringify(updatedData),
    success: function (response) {
      setTimeout(() => {
        alert("sukses ubah data material!");
      }, 50);
      loadMaterialDropdown();
      loadMaterialList();

      $("#materialName").val("");
      tinymce.get("materialContent").setContent("");

      $("#addMaterialBtn").text("Add Material");

      $("#materialForm").off("submit");
    },
    error: function (error) {
      setTimeout(() => {
        alert("gagal nambah data material!");
      }, 50);
    },
  });
}

function populateMaterialForm(materialId) {
  $.ajax({
    type: "GET",
    url: "http://34.87.40.161/api/materials/" + materialId,
    success: function (response) {
      var material = response.material;
      $("#materialName").val(material.name);
      tinymce.get("materialContent").setContent(material.content);

      $("#materialIdHidden").val(materialId);
      $("#addMaterialBtn").text("Update Material");
    },
    error: function (error) {
      setTimeout(() => {
        alert("gagal mengambil data detail material!");
      }, 50);
    },
  });
}

function loadMaterialDropdown() {
  $.ajax({
    type: "GET",
    url: "http://34.87.40.161/api/materials",
    success: function (response) {
      var materials = response.material;
      $("#materialDropdown").empty();
      materials.forEach(function (material) {
        $("#materialDropdown").append(
          '<option value="' + material.id + '">' + material.name + "</option>"
        );
      });
    },
    error: function (error) {
      setTimeout(() => {
        alert("gagal load data material!");
      }, 50);
    },
  });
}

$(document).ready(function () {
  tinymce.init({
    selector: "#materialContent",
    plugins: "image",
    a11y_advanced_options: true,
    height: 300,
    plugins: [
      "advlist",
      "autolink",
      "link",
      "image",
      "lists",
      "charmap",
      "preview",
      "anchor",
      "pagebreak",
      "searchreplace",
      "wordcount",
      "visualblocks",
      "visualchars",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "emoticons",
      "template",
      "help",
    ],
    toolbar:
      "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | " +
      "bullist numlist outdent indent | link image | print preview media fullscreen | " +
      "forecolor backcolor emoticons | help",
  });

  loadMaterialList();
  loadMaterialDropdown();
});
