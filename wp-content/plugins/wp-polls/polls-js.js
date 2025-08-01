function poll_vote(l) {
  jQuery(document).ready(function (o) {
    (poll_answer_id = ""),
      (poll_multiple_ans = 0),
      (poll_multiple_ans_count = 0),
      o("#poll_multiple_ans_" + l).length &&
        (poll_multiple_ans = parseInt(o("#poll_multiple_ans_" + l).val())),
      o(
        "#polls_form_" +
          l +
          " input:checkbox, #polls_form_" +
          l +
          " input:radio, #polls_form_" +
          l +
          " option"
      ).each(function (l) {
        (o(this).is(":checked") || o(this).is(":selected")) &&
          (poll_multiple_ans > 0
            ? ((poll_answer_id = o(this).val() + "," + poll_answer_id),
              poll_multiple_ans_count++)
            : (poll_answer_id = parseInt(o(this).val())));
      }),
      poll_multiple_ans > 0
        ? poll_multiple_ans_count > 0 &&
          poll_multiple_ans_count <= poll_multiple_ans
          ? ((poll_answer_id = poll_answer_id.substring(
              0,
              poll_answer_id.length - 1
            )),
            poll_process(l, poll_answer_id))
          : 0 == poll_multiple_ans_count
          ? alert(pollsL10n.text_valid)
          : alert(pollsL10n.text_multiple + " " + poll_multiple_ans)
        : poll_answer_id > 0
        ? poll_process(l, poll_answer_id)
        : alert(pollsL10n.text_valid);
  });
}
function poll_process(l, o) {
  jQuery(document).ready(function (s) {
    (poll_nonce = s("#poll_" + l + "_nonce").val()),
      pollsL10n.show_fading
        ? (s("#polls-" + l).fadeTo("def", 0),
          pollsL10n.show_loading && s("#polls-" + l + "-loading").show(),
          s.ajax({
            type: "POST",
            xhrFields: { withCredentials: !0 },
            url: pollsL10n.ajax_url,
            data:
              "action=polls&view=process&poll_id=" +
              l +
              "&poll_" +
              l +
              "=" +
              o +
              "&poll_" +
              l +
              "_nonce=" +
              poll_nonce,
            cache: !1,
            success: poll_process_success(l),
          }))
        : (pollsL10n.show_loading && s("#polls-" + l + "-loading").show(),
          s.ajax({
            type: "POST",
            xhrFields: { withCredentials: !0 },
            url: pollsL10n.ajax_url,
            data:
              "action=polls&view=process&poll_id=" +
              l +
              "&poll_" +
              l +
              "=" +
              o +
              "&poll_" +
              l +
              "_nonce=" +
              poll_nonce,
            cache: !1,
            success: poll_process_success(l),
          }));
  });
}
function poll_result(l) {
  jQuery(document).ready(function (o) {
    (poll_nonce = o("#poll_" + l + "_nonce").val()),
      pollsL10n.show_fading
        ? (o("#polls-" + l).fadeTo("def", 0),
          pollsL10n.show_loading && o("#polls-" + l + "-loading").show(),
          o.ajax({
            type: "POST",
            xhrFields: { withCredentials: !0 },
            url: pollsL10n.ajax_url,
            data:
              "action=polls&view=result&poll_id=" +
              l +
              "&poll_" +
              l +
              "_nonce=" +
              poll_nonce,
            cache: !1,
            success: poll_process_success(l),
          }))
        : (pollsL10n.show_loading && o("#polls-" + l + "-loading").show(),
          o.ajax({
            type: "POST",
            xhrFields: { withCredentials: !0 },
            url: pollsL10n.ajax_url,
            data:
              "action=polls&view=result&poll_id=" +
              l +
              "&poll_" +
              l +
              "_nonce=" +
              poll_nonce,
            cache: !1,
            success: poll_process_success(l),
          }));
  });
}
function poll_booth(l) {
  jQuery(document).ready(function (o) {
    (poll_nonce = o("#poll_" + l + "_nonce").val()),
      pollsL10n.show_fading
        ? (o("#polls-" + l).fadeTo("def", 0),
          pollsL10n.show_loading && o("#polls-" + l + "-loading").show(),
          o.ajax({
            type: "POST",
            xhrFields: { withCredentials: !0 },
            url: pollsL10n.ajax_url,
            data:
              "action=polls&view=booth&poll_id=" +
              l +
              "&poll_" +
              l +
              "_nonce=" +
              poll_nonce,
            cache: !1,
            success: poll_process_success(l),
          }))
        : (pollsL10n.show_loading && o("#polls-" + l + "-loading").show(),
          o.ajax({
            type: "POST",
            xhrFields: { withCredentials: !0 },
            url: pollsL10n.ajax_url,
            data:
              "action=polls&view=booth&poll_id=" +
              l +
              "&poll_" +
              l +
              "_nonce=" +
              poll_nonce,
            cache: !1,
            success: poll_process_success(l),
          }));
  });
}
function poll_process_success(l) {
  return function (o) {
    jQuery(document).ready(function (s) {
      s("#polls-" + l).replaceWith(o),
        pollsL10n.show_loading && s("#polls-" + l + "-loading").hide(),
        pollsL10n.show_fading && s("#polls-" + l).fadeTo("def", 1);
    });
  };
}
(pollsL10n.show_loading = parseInt(pollsL10n.show_loading)),
  (pollsL10n.show_fading = parseInt(pollsL10n.show_fading));
