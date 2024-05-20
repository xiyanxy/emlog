function getChecked(node) {
    let re = false;
    $('input.' + node).each(function (i) {
        if (this.checked) {
            re = true;
        }
    });
    return re;
}

function timestamp() {
    return new Date().getTime();
}

function em_confirm(id, property, token) {
    let url, msg;
    let text = '删除后可能无法恢复'
    switch (property) {
        case 'article':
            url = 'article.php?action=del&gid=' + id;
            msg = '确定要删除该篇文章吗？';
            text = '彻底删除将无法恢复'
            delArticle(msg, text, url, token)
            break;
        case 'draft':
            url = 'article.php?action=del&draft=1&gid=' + id;
            msg = '确定要删除该篇草稿吗？';
            delAlert(msg, text, url, token)
            break;
        case 'tw':
            url = 'twitter.php?action=del&id=' + id;
            msg = '确定要删除该条微语吗？';
            delAlert(msg, text, url, token)
            break;
        case 'comment':
            url = 'comment.php?action=del&id=' + id;
            msg = '确定要删除该评论吗？';
            delAlert(msg, text, url, token)
            break;
        case 'commentbyip':
            url = 'comment.php?action=delbyip&ip=' + id;
            msg = '确定要删除来自该IP的所有评论吗？';
            delAlert(msg, text, url, token)
            break;
        case 'link':
            url = 'link.php?action=del&linkid=' + id;
            msg = '确定要删除该链接吗？';
            delAlert(msg, text, url, token)
            break;
        case 'navi':
            url = 'navbar.php?action=del&id=' + id;
            msg = '确定要删除该导航吗？';
            delAlert(msg, text, url, token)
            break;
        case 'media':
            url = 'media.php?action=delete&aid=' + id;
            msg = '确定要删除该媒体文件吗？';
            delAlert(msg, text, url, token)
            break;
        case 'avatar':
            url = 'blogger.php?action=delicon';
            msg = '确定要删除头像吗？';
            delAlert(msg, text, url, token)
            break;
        case 'sort':
            url = 'sort.php?action=del&sid=' + id;
            msg = '确定要删除该分类吗？';
            delAlert(msg, text, url, token)
            break;
        case 'del_user':
            url = 'user.php?action=del&uid=' + id;
            msg = '确定要删除该用户吗？';
            delAlert(msg, text, url, token)
            break;
        case 'forbid_user':
            url = 'user.php?action=forbid&uid=' + id;
            msg = '确定要禁用该用户吗？';
            text = '';
            delAlert(msg, text, url, token)
            break;
        case 'tpl':
            url = 'template.php?action=del&tpl=' + id;
            msg = '确定要删除该模板吗？';
            delAlert(msg, text, url, token)
            break;
        case 'reset_widget':
            url = 'widgets.php?action=reset';
            msg = '确定要重置组件吗？';
            text = '重置会丢失自定义的组件';
            delAlert(msg, text, url, token)
            break;
        case 'plu':
            url = 'plugin.php?action=del&plugin=' + id;
            msg = '确定要删除该插件吗？';
            delAlert(msg, text, url, token)
            break;
        case 'media_sort':
            url = 'media.php?action=del_media_sort&id=' + id;
            msg = '确定要删除该资源分类吗？';
            text = '不会删除分类下资源文件';
            delAlert(msg, text, url, token)
            break;
    }
}

function infoAlert(msg) {
    layer.alert(msg, {
        icon: 2,
        shadeClose: true,
        title: '',
    });
}

function delAlert(msg, text, url, token) {
    // icon: 0 default, 1 ok, 2 err, 3 ask
    layer.confirm(text, {icon: 0, title: msg}, function (index) {
        window.location = url + '&token=' + token;
        layer.close(index);
    });
}

function delAlert2(msg, text, actionClosure) {
    layer.confirm(text, {icon: 0, title: msg}, function (index) {
        actionClosure(); // 执行闭包
        layer.close(index);
    });
}

function delArticle(msg, text, url, token) {
    layer.confirm(text, {
        title: msg,
        icon: 0,
        btn: ['放入草稿', '<span class="text-danger">彻底删除</span>', '取消']
    }, function (index) {
        window.location = url + '&token=' + token;
        layer.close(index);
    }, function (index) {
        window.location = url + '&rm=1&token=' + token;
        layer.close(index);
    }, function (index) {
        layer.close(index);
    });
}

function submitForm(formId, successMsg) {
    $.ajax({
        type: "POST",
        url: $(formId).attr('action'),
        data: $(formId).serialize(),
        success: function () {
            cocoMessage.success(successMsg || '保存成功')
        },
        error: function (xhr) {
            const errorMsg = JSON.parse(xhr.responseText).msg;
            cocoMessage.error(errorMsg, 4000)
        }
    });
}

function focusEle(id) {
    try {
        document.getElementById(id).focus();
    } catch (e) {
    }
}

function hideActived() {
    $(".alert-success").slideUp(300);
    $(".alert-danger").slideUp(300);
}

// Click action of [More Options] 
let icon_mod = "down";

function displayToggle(id) {
    $("#" + id).toggle();
    if (icon_mod === "down") {
        icon_mod = "right";
        $(".icofont-simple-down").attr("class", "icofont-simple-right")
    } else {
        icon_mod = "down";
        $(".icofont-simple-right").attr("class", "icofont-simple-down")
    }

    Cookies.set('em_' + id, icon_mod, {expires: 365})
}

function doToggle(id) {
    $("#" + id).toggle();
}

function insertTag(tag, boxId) {
    var targetinput = $("#" + boxId).val();
    if (targetinput == '') {
        targetinput += tag;
    } else {
        var n = ',' + tag;
        targetinput += n;
    }
    $("#" + boxId).val(targetinput);
    if (boxId == "tag") $("#tag_label").hide();
}

function isalias(a) {
    var reg1 = /^[\w-]*$/;
    var reg2 = /^\d+$/;
    var reg3 = /^post(-\d+)?$/;
    if (!reg1.test(a)) {
        return 1;
    } else if (reg2.test(a)) {
        return 2;
    } else if (reg3.test(a)) {
        return 3;
    } else if (a === 't' || a === 'm' || a === 'admin') {
        return 4;
    } else {
        return 0;
    }
}

function checkform() {
    var a = $.trim($("#alias").val());
    var t = $.trim($("#title").val());

    if (typeof articleTextRecord !== "undefined") {  // 提交时，重置原文本记录值，防止出现离开提示
        articleTextRecord = $("textarea[name=logcontent]").text();
    } else {
        pageText = $("textarea").text();
    }
    if (0 == isalias(a)) {
        return true;
    } else {
        infoAlert("链接别名错误");
        $("#alias").focus();
        return false;
    }
}

function checkalias() {
    var a = $.trim($("#alias").val());
    if (1 == isalias(a)) {
        $("#alias_msg_hook").html('<span id="input_error">别名错误，应由字母、数字、下划线、短横线组成</span>');
    } else if (2 == isalias(a)) {
        $("#alias_msg_hook").html('<span id="input_error">别名错误，不能为纯数字</span>');
    } else if (3 == isalias(a)) {
        $("#alias_msg_hook").html('<span id="input_error">别名错误，不能为\'post\'或\'post-数字\'</span>');
    } else if (4 == isalias(a)) {
        $("#alias_msg_hook").html('<span id="input_error">别名错误，与系统链接冲突</span>');
    } else {
        $("#alias_msg_hook").html('');
        $("#msg").html('');
    }
}

// act 1：Auto save 2：User manually saves
function autosave(act) {
    const nodeid = "as_logid";
    const timeout = 60000;
    const url = "article_save.php?action=autosave";
    const alias = $.trim($("#alias").val());
    const content = Editor.getMarkdown();
    let ishide = $.trim($("#ishide").val());
    if (ishide === "") {
        $("#ishide").val("y")
    }

    if (alias != '' && 0 != isalias(alias)) {
        $("#msg").show().html("链接别名错误，自动保存失败");
        if (act == 0) {
            setTimeout("autosave(1)", timeout);
        }
        return;
    }
    // 编辑发布状态的文章时不自动保存
    if (act == 1 && ishide == 'n') {
        return;
    }
    // 内容为空时不自动保存
    if (act == 1 && content == "") {
        setTimeout("autosave(1)", timeout);
        return;
    }
    // 距离上次保存成功时间小于一秒时不允许手动保存
    if ((new Date().getTime() - Cookies.get('em_saveLastTime')) < 1000 && act != 1) return;

    const $savedf = $("#savedf");
    const btname = $savedf.val();
    $savedf.val("正在保存中...").attr("disabled", "disabled");
    $('title').text('[保存中] ' + titleText);
    $.post(url, $("#addlog").serialize(), function (data) {
        data = $.trim(data);
        var isresponse = /.*autosave\_gid\:\d+\_.*/;
        if (isresponse.test(data)) {
            const getvar = data.match(/_gid:([\d]+)_/);
            const logid = getvar[1];
            const d = new Date();
            const h = d.getHours();
            const m = d.getMinutes();
            const tm = (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m);
            $("#save_info").html("保存于：" + tm + " <a href=\"../?post=" + logid + "\" target=\"_blank\">预览文章</a>");
            $('title').text('[保存成功] ' + titleText);
            setTimeout(function () {
                $('title').text(titleText);
            }, 2000);
            articleTextRecord = $("#addlog textarea[name=logcontent]").val(); // 保存成功后，将原文本记录值替换为现在的文本
            Cookies.set('em_saveLastTime', new Date().getTime()); // 把保存成功时间戳记录（或更新）到 cookie 中
            $("#" + nodeid).val(logid);
            $("#savedf").attr("disabled", false).val(btname);
        } else {
            $("#savedf").attr("disabled", false).val(btname);
            $("#save_info").html("保存失败，可能文章不可编辑或达到每日发文限额").addClass("alert-danger");
            $('title').text('[保存失败] ' + titleText);
        }
    });
    if (act == 1) {
        setTimeout("autosave(1)", timeout);
    }
}

// “页面”的 editor.md 编辑器 Ctrl + S 快捷键的自动保存动作
const pagetitle = $('title').text();

function pagesave() {
    document.addEventListener('keydown', function (e) {  // 阻止自动保存产生的浏览器默认动作
        if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
            e.preventDefault();
        }
    });
    let url = "page.php?action=save";
    if ($("[name='pageid']").attr("value") < 0) return infoAlert("请先发布页面！");
    if (!$("[name='pagecontent']").html()) return infoAlert("页面内容不能为空！");
    $('title').text('[保存中...] ' + pagetitle);
    $.post(url, $("#addlog").serialize(), function (data) {
        $('title').text('[保存成功] ' + pagetitle);
        setTimeout(function () {
            $('title').text(pagetitle);
        }, 2000);
        pageText = $("textarea").text();
    }).fail(function () {
        $('title').text('[保存失败] ' + pagetitle);
        infoAlert("保存失败！")
    });
}

// toggle plugin
$.fn.toggleClick = function () {
    var functions = arguments;
    return this.click(function () {
        var iteration = $(this).data('iteration') || 0;
        functions[iteration].apply(this, arguments);
        iteration = (iteration + 1) % functions.length;
        $(this).data('iteration', iteration);
    });
};

function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
    str = str.replace(/ /ig, '');
    return str;
}

// editor.md 的 js 钩子
var queue = new Array();
var hooks = {
    addAction: function (hook, func) {
        if (typeof (queue[hook]) == "undefined" || queue[hook] == null) {
            queue[hook] = new Array();
        }
        if (typeof func == 'function') {
            queue[hook].push(func);
        }
    },
    doAction: function (hook, obj) {
        try {
            for (var i = 0; i < queue[hook].length; i++) {
                queue[hook][i](obj);
            }
        } catch (e) {
        }
    }
}

// 粘贴上传图片函数
function imgPasteExpand(thisEditor) {
    var listenObj = document.querySelector("textarea").parentNode  // 要监听的对象
    var postUrl = './media.php?action=upload';  // emlog 的图片上传地址
    var emMediaPhpUrl = "./media.php?action=lib";  // emlog 的资源库地址,用于异步获取上传后的图片数据

    // 通过动态配置只读模式,阻止编辑器原有的粘贴动作发生,并恢复光标位置
    function preventEditorPaste() {
        let l = thisEditor.getCursor().line;
        let c = thisEditor.getCursor().ch - 3;

        thisEditor.config({readOnly: true,});
        thisEditor.config({readOnly: false,});
        thisEditor.setCursor({line: l, ch: c});
    }

    // 编辑器通过光标处位置前几位来替换文字
    function replaceByNum(text, num) {
        let l = thisEditor.getCursor().line;
        let c = thisEditor.getCursor().ch;

        thisEditor.setSelection({line: l, ch: (c - num)}, {line: l, ch: c});
        thisEditor.replaceSelection(text);
    }

    // 粘贴事件触发
    listenObj.addEventListener("paste", function (e) {
        if ($('.editormd-dialog').css('display') == 'block') return;  // 如果编辑器有对话框则退出
        if (!(e.clipboardData && e.clipboardData.items)) return;

        var pasteData = e.clipboardData || window.clipboardData; // 获取剪切板里的全部内容
        pasteAnalyseResult = new Array;  // 用于储存遍历分析后的结果

        for (var i = 0; i < pasteData.items.length; i++) {  // 遍历分析剪切板里的数据
            var item = pasteData.items[i];

            if ((item.kind == "file") && (item.type.match('^image/'))) {
                var imgData = item.getAsFile();
                if (imgData.size === 0) return;
                pasteAnalyseResult['type'] = 'img';
                pasteAnalyseResult['data'] = imgData;
                break;  // 当粘贴板中有图片存在时,跳出循环
            }
            ;
        }

        if (pasteAnalyseResult['type'] == 'img') {  // 如果剪切板中有图片,上传图片
            preventEditorPaste();
            uploadImg(pasteAnalyseResult['data']);
            return;
        }
    }, false);

    // 上传图片
    function uploadImg(img) {
        var formData = new FormData();
        var imgName = "粘贴上传" + new Date().getTime() + "." + img.name.split(".").pop();

        formData.append('file', img, imgName);
        thisEditor.insertValue("上传中...");
        $.ajax({
            url: postUrl, type: 'post', data: formData, processData: false, contentType: false, xhr: function () {
                var xhr = $.ajaxSettings.xhr();
                if (xhr.upload) {
                    thisEditor.insertValue("....");
                    xhr.upload.addEventListener('progress', function (e) {  // 用以显示上传进度
                        console.log('进度(byte)：' + e.loaded + ' / ' + e.total);
                        let percent = Math.floor(e.loaded / e.total * 100);
                        if (percent < 10) {
                            replaceByNum('..' + percent + '%', 4);
                        } else if (percent < 100) {
                            replaceByNum('.' + percent + '%', 4);
                        } else {
                            replaceByNum(percent + '%', 4);
                        }
                    }, false);
                }
                return xhr;
            }, success: function (result) {
                console.log('上传成功！正在获取结果...');
                $.get(emMediaPhpUrl, function (resp) {
                    var image = resp.data.images[0];
                    if (image) {
                        console.log('获取结果成功！')
                        replaceByNum(`[![](${image.media_icon})](${image.media_url})`, 10);  // 这里的数字 10 对应着’上传中...100%‘是10个字符
                    } else {
                        console.log('获取结果失败！')
                        infoAlert('获取结果失败！');
                    }
                })
            }, error: function (result) {
                infoAlert('上传失败,图片类型错误或网络错误');
                replaceByNum('上传失败,图片类型错误或网络错误', 6);
            }
        })
    }
}

// 把粘贴上传图片函数，挂载到位于文章编辑器、页面编辑器处的 js 钩子处
hooks.addAction("loaded", imgPasteExpand);
hooks.addAction("page_loaded", imgPasteExpand);

function loadTopAddons() {
    $.ajax({
        type: 'GET', url: './store.php?action=top', success: function (resp) {
            $.each(resp.data, function (i, app) {
                let insertBtnHtml;
                let storeUlr = './store.php?';
                if (app.type === 'plu') {
                    storeUlr = './store.php?action=plu';
                }
                if (app.price > 0) {
                    insertBtnHtml = app.price + '元';
                } else {
                    insertBtnHtml = '免费';
                }
                apptitle = '<a href="' + storeUlr + '&keyword=' + app.name + '">' + app.name + '</a>';
                const cardHtml = '<li class="list-group-item d-flex justify-content-between align-items-center"><span>' + apptitle + '<small class="text-muted"><br>' + app.info + '</small></span>' + '<span class="small">' + insertBtnHtml + '</span></li>';
                $('#app-list').append(cardHtml);
            });
        },
    });
}

function checkUpdate() {
    const updateModal = $("#update-modal");
    const updateModalLoading = $("#update-modal-loading");
    const updateModalMsg = $("#update-modal-msg");
    const updateModalChanges = $("#update-modal-changes");
    const updateModalBtn = $("#update-modal-btn");

    updateModal.modal('show');
    updateModalLoading.addClass("spinner-border text-primary");

    let rep_msg = "";
    let rep_changes = "";
    let rep_btn = "";

    updateModalMsg.html(rep_msg);
    updateModalChanges.html(rep_changes);
    updateModalBtn.html(rep_btn);

    $.get("./upgrade.php?action=check_update", function (result) {
        if (result.code === 1001) {
            rep_msg = "您的emlog pro尚未注册，<a href=\"auth.php\">去注册</a>";
        } else if (result.code === 1002) {
            rep_msg = "已经是最新版本";
        } else if (result.code === 200) {
            rep_msg = `有可用的新版本：<span class="text-danger">${result.data.version}</span> <br><br>`;
            rep_changes = "<b>更新内容</b>:<br>" + result.data.changes;
            rep_btn = `<hr><a href="javascript:doUp('${result.data.cdn_file}','${result.data.cdn_sql}');" id="upbtn" class="btn btn-success btn-sm">现在更新</a>`;
        } else {
            rep_msg = "检查失败，可能是网络问题";
        }

        updateModalLoading.removeClass();
        updateModalMsg.html(rep_msg);
        updateModalChanges.html(rep_changes);
        updateModalBtn.html(rep_btn);
    });
}

function doUp(source, upSQL) {
    const updateModalLoading = $("#update-modal-loading");
    const updateModalMsg = $("#update-modal-msg");
    const updateModalChanges = $("#update-modal-changes");
    const upmsg = $("#upmsg");
    const upbtn = $("#upbtn");

    updateModalLoading.addClass("spinner-border text-primary");
    updateModalMsg.html("更新中... 请耐心等待");
    updateModalChanges.html("");

    $.get(`./upgrade.php?action=update&source=${source}&upsql=${upSQL}`, function (data) {
        upmsg.removeClass();
        if (data.includes("succ")) {
            upbtn.text('刷新页面');
            upbtn.attr('href', './');
            updateModalMsg.html('🎉恭喜，更新成功了🎉，<a href="./">刷新页面</a> 开始体验新版本');
        } else if (data.includes("error_down")) {
            updateModalMsg.html('下载更新失败，可能是服务器网络问题');
        } else if (data.includes("error_zip")) {
            updateModalMsg.html('解压更新失败，可能是你的服务器空间不支持zip模块');
        } else if (data.includes("error_dir")) {
            updateModalMsg.html('更新失败，目录不可写');
        } else {
            updateModalMsg.html('更新失败');
        }

        updateModalLoading.removeClass();
    });
}

$(function () {
    // 设置界面: 自动检测站点地址 如果设置“自动检测地址”，则设置 input 为只读，以表示该项是无效的
    if ($("#detect_url").prop("checked")) {
        $("[name=blogurl]").attr("readonly", "readonly")
    }
    $("#detect_url").click(function () {
        if ($(this).prop("checked")) {
            $("[name=blogurl]").attr("readonly", "readonly")
        } else {
            $("[name=blogurl]").removeAttr("readonly")
        }
    })

    // 复选框全选
    $('#checkAllItem').click(function () {
        let cardCheckboxes = $('.checkboxContainer').find('input[type=checkbox]');
        cardCheckboxes.prop('checked', $(this).prop('checked'));
    });

    $('.checkboxContainer').find('input[type=checkbox]').click(function () {
        let allChecked = true;
        $('.checkboxContainer').find('input[type=checkbox]').each(function () {
            if (!$(this).prop('checked')) {
                allChecked = false;
                return false;
            }
        });
        $('#checkAllItem').prop('checked', allChecked);
    });

    // 应用商店：应用安装
    $('.installBtn').click(function (e) {
        e.preventDefault();
        let link = $(this);
        let down_url = link.data('url');
        let cdn_down_url = link.data('cdn-url');
        let type = link.data('type');
        link.text('安装中…');
        link.parent().prev(".installMsg").html("").addClass("spinner-border text-primary");

        let url = './store.php?action=install&type=' + type + '&source=' + down_url + '&cdn_source=' + cdn_down_url;
        $.get(url, function (data) {
            link.text('免费安装');
            link.parent().prev(".installMsg").html('<span class="text-danger">' + data + '</span>').removeClass("spinner-border text-primary");
        });
    });

    // 应用商店：查看应用信息
    $('#appModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var name = button.data('name');
        var url = button.data('url');
        var buy_url = button.data('buy-url');
        var modal = $(this);

        modal.find('.modal-body').empty();
        modal.find('.modal-title').html(name);
        modal.find('.modal-buy-url').attr('href', buy_url);

        var loadingSpinner = '<div class="spinner-border text-primary ml-3"><span class="sr-only">Loading...</span></div>';
        modal.find('.modal-title').append(loadingSpinner);

        var iframe = $('<iframe>', {
            'class': 'iframe-content',
            'src': url,
            'frameborder': 0
        });

        iframe.on('load', function () {
            $('.spinner-border').remove();
        });

        modal.find('.modal-body').append(iframe);
    });
})