function addQuestion() {
    var questionTextValue = $("#questionText").val();
    var selectedMaterialId = $("#materialDropdown").val();

    // Collect options data
    var options = [];
    $("#options .option-group").each(function(index) {
        var optionText = $(this).find("input[type='text']").val();
        var isCorrect = $(this).find("input[type='checkbox']").prop("checked");

        options.push({
            option: String.fromCharCode(65 + index), // Convert index to A, B, C, ...
            value: optionText,
            isCorrect: isCorrect
        });
    });

    var requestData = {
        questions: questionTextValue,
        answer: options,
        materialId: selectedMaterialId,
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/quiz",
        contentType: "application/json",
        data: JSON.stringify(requestData),
        success: function (response) {
            setTimeout(() => {
                alert("sukses nambah data pertanyaan!");
            }, 50)
            $("#questionText").val('');
            $("#options").empty();
            displayQuestions();

        },
        error: function (error) {
            setTimeout(() => {
                alert("gagal nambah data pertanyaan!");
            }, 50)
        }
    });
}

// Function to add a new option field
function addOption() {
    var optionIndex = $("#options .option-group").length;
    var optionChar = String.fromCharCode(65 + optionIndex); // Convert index to A, B, C, ...

    var optionField = `
        <div class="option-group mb-2">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Pilihan ${optionChar}" required>
                <div class="input-group-append">
                    <button class="btn btn-danger" type="button" onclick="removeOption(this)">Hapus</button>
                </div>
            </div>
            <div class="form-check mt-1">
                <input type="checkbox" class="form-check-input" id="correct${optionChar}">
                <label class="form-check-label" for="correct${optionChar}">Set Pilihan Benar</label>
            </div>
        </div>`;

    $("#options").append(optionField);
}

// Function to remove an option field
function removeOption(button) {
    $(button).closest(".option-group").remove();
}
