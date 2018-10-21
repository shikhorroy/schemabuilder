$(document).ready(function () {
    onFocusCheck();
    $("input[name = 'populate-schema']").click(populateSchema);
    $("input[name = 'qeury']").click(query);
});

function onFocusCheck() {
    $('#sql-textarea textarea').focus(function () {
        $(this).css("border-color", "");
    });
    $("input[name = 'schema-path']").focus(function () {
        $(this).css("border-color", "");
    });
    $("input[name = 'model']").focus(function () {
        $(this).css("border-color", "");
    });
}

var query = function () {
    var flag = checkRequired();
    if (flag == false) return;

    var data = prepareData();

    $.ajax({
        type: "POST",
        url: hostPort + "/QueryExecutor/query/",
        data: {
            "data": JSON.stringify(data)
        },
        cache: false,
        success: function (data) {
            alert(data);
        },
        error: function (error) {
            alert(error);
        }
    });
};

var populateSchema = function () {
    var flag = checkRequired();
    if (flag == false) return;

    var data = prepareData();

    $.ajax({
        type: "POST",
        url: hostPort + "/PopulateSchema/populate/",
        data: {
            "data": JSON.stringify(data)
        },
        cache: false,
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            alert(error);
        }
    });
};

var prepareData = function () {
    var sql = $('#sql-textarea textarea')[0].value;
    var selectedSqlLang = $("#sql-lang-options option:selected")[0].value;
    var schemaPath = $("input[name = 'schema-path']").val();
    var model = $("input[name = 'model']").val();

    return {
        "sql": sql,
        "selectedSqlLanguage": selectedSqlLang,
        "schemaPath": schemaPath,
        "model": model
    };
};

function checkRequired() {
    var sql = $('#sql-textarea textarea')[0].value;
    var schemaPath = $("input[name = 'schema-path']").val();
    var model = $("input[name = 'model']").val();

    var flag = true;
    if (sql.length == 0) {
        flag = false;
        $('#sql-textarea textarea').css('border-color', 'red');
    }
    if (schemaPath.length == 0) {
        flag = false;
        $("input[name = 'schema-path']").css('border-color', 'red');
    }
    if (model.length == 0) {
        flag = false;
        $("input[name = 'model']").css('border-color', 'red');
    }
    return flag;
}

var hostPort = function () {
    var port = window.location.port;
    var host = window.location.hostname;

    return "http://" + host + ":" + port;
};
