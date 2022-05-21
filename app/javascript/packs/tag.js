import "select2";

$(document).on("turbolinks:load", function () {
  $(".tag_list").select2({
    tags: true,
    tokenSeparators: [",", " "],
  });
});
