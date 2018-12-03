"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Theme2 {
    templateHTML(name, msg) {
        const theme2 = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <title>*|MC:SUBJECT|*</title>
                <style type="text/css">
        @media only screen and (max-width: 480px) {
          body,
        table,
        td,
        p,
        a,
        li,
        blockquote {
            -webkit-text-size-adjust: none !important;
          }
          body {
            width: 100% !important;
            min-width: 100% !important;
          }
          #bodyCell {
            padding: 10px !important;
          }
          #templateContainer {
            max-width: 600px !important;
            width: 100% !important;
          }
          h1 {
            font-size: 24px !important;
            line-height: 100% !important;
          }
          h2 {
            font-size: 20px !important;
            line-height: 100% !important;
          }
          h3 {
            font-size: 18px !important;
            line-height: 100% !important;
          }
          h4 {
            font-size: 16px !important;
            line-height: 100% !important;
          }
          #templatePreheader {
            display: none !important;
          }
          #headerImage {
            height: auto !important;
            max-width: 600px !important;
            width: 100% !important;
          }
          .headerContent {
            font-size: 20px !important;
            line-height: 125% !important;
          }
          #bodyImage {
            height: auto !important;
            max-width: 560px !important;
            width: 100% !important;
          }
          .bodyContent {
            font-size: 18px !important;
            line-height: 125% !important;
          }
          .templateColumnContainer {
            display: block !important;
            width: 100% !important;
          }
          .columnImage {
            height: auto !important;
            max-width: 260px !important;
            width: 100% !important;
          }
          .leftColumnContent {
            font-size: 16px !important;
            line-height: 125% !important;
          }
          .rightColumnContent {
            font-size: 16px !important;
            line-height: 125% !important;
          }
          .footerContent {
            font-size: 14px !important;
            line-height: 115% !important;
          }
          .footerContent a {
            display: block !important;
          }
        }
        </style>
            </head>
            <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; margin: 0; padding: 0; background-color: #DEE0E2; height: 100%; width: 100%;">
                <center>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; margin: 0; padding: 0; background-color: #DEE0E2; border-collapse: collapse; height: 100%; width: 100%;" bgcolor="#DEE0E2">
                        <tr>
                            <td align="center" valign="top" id="bodyCell" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; margin: 0; padding: 20px; border-top: 4px solid #BBBBBB; height: 100%; width: 100%;" width="100%" height="100%">
                                <!-- BEGIN TEMPLATE // -->
                                <table border="0" cellpadding="0" cellspacing="0" id="templateContainer" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 600px; border: 1px solid #BBBBBB; border-collapse: collapse;" width="600">
                                    <tr>
                                        <td align="center" valign="top" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <!-- BEGIN PREHEADER // -->
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templatePreheader" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #F4F4F4; border-bottom: 1px solid #CCCCCC; border-collapse: collapse;" bgcolor="#F4F4F4">
                                                <tr>
                                                    <td valign="top" class="preheaderContent" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #808080; font-family: Helvetica; font-size: 10px; line-height: 125%; text-align: left; padding-top: 10px; padding-right: 20px; padding-bottom: 10px; padding-left: 20px;" mc:edit="preheader_content00" align="left">
                                                        Use this area to offer a short teaser of your email's content. Text here will show in the preview area of some email clients.
                                                    </td>
                                                    <!-- *|IFNOT:ARCHIVE_PAGE|* -->
                                                    <td valign="top" width="180" class="preheaderContent" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #808080; font-family: Helvetica; font-size: 10px; line-height: 125%; text-align: left; padding-top: 10px; padding-right: 20px; padding-bottom: 10px; padding-left: 0;" mc:edit="preheader_content01" align="left">
                                                        Email not displaying correctly?<br><a href="*|ARCHIVE|*" target="_blank" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">View it in your browser</a>.
                                                    </td>
                                                    <!-- *|END:IF|* -->
                                                </tr>
                                            </table>
                                            <!-- // END PREHEADER -->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" valign="top" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <!-- BEGIN HEADER // -->
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateHeader" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #F4F4F4; border-top: 1px solid #FFFFFF; border-bottom: 1px solid #CCCCCC; border-collapse: collapse;" bgcolor="#F4F4F4">
                                                <tr>
                                                    <td valign="middle" class="headerContent" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #505050; font-family: Helvetica; font-size: 20px; font-weight: bold; line-height: 100%; padding-top: 0; padding-right: 0; padding-bottom: 0; padding-left: 0; text-align: left; vertical-align: middle;" align="left">
                                                        <img src="http://gallery.mailchimp.com/2425ea8ad3/images/header_placeholder_600px.png" style="-ms-interpolation-mode: bicubic; border: 0; line-height: 100%; outline: none; text-decoration: none; height: auto; max-width: 600px;" id="headerImage" mc:label="header_image" mc:edit="header_image" mc:allowdesigner="" mc:allowtext="">
                                                    </td>
                                                </tr>
                                            </table>
                                            <!-- // END HEADER -->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" valign="top" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <!-- BEGIN BODY // -->
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateBody" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #F4F4F4; border-top: 1px solid #FFFFFF; border-bottom: 1px solid #CCCCCC; border-collapse: collapse;" bgcolor="#F4F4F4">
                                                <tr>
                                                    <td valign="top" class="bodyContent" mc:edit="body_content00" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #505050; font-family: Helvetica; font-size: 16px; line-height: 150%; padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 20px; text-align: left;" align="left">
                                                        <h1 style="display: block; font-family: Helvetica; font-size: 26px; font-style: normal; font-weight: bold; line-height: 100%; letter-spacing: normal; margin-top: 0; margin-right: 0; margin-bottom: 10px; margin-left: 0; text-align: left; color: #202020;">Inmobiliaria Cobian</h1>
                                                        <h3 style="display: block; font-family: Helvetica; font-size: 16px; font-style: italic; font-weight: normal; line-height: 100%; letter-spacing: normal; margin-top: 0; margin-right: 0; margin-bottom: 10px; margin-left: 0; text-align: left; color: #606060;">Hola ${name}:</h3>
                                                        ${msg}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="bodyContent" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #505050; font-family: Helvetica; font-size: 16px; line-height: 150%; padding-right: 20px; padding-left: 20px; text-align: left; padding-top: 0; padding-bottom: 0;" align="left">
                                                        <img src="http://gallery.mailchimp.com/27aac8a65e64c994c4416d6b8/images/body_placeholder_650px.png" style="-ms-interpolation-mode: bicubic; border: 0; line-height: 100%; outline: none; text-decoration: none; display: inline; height: auto; max-width: 560px;" id="bodyImage" mc:label="body_image" mc:edit="body_image" mc:allowtext="">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" class="bodyContent" mc:edit="body_content01" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #505050; font-family: Helvetica; font-size: 16px; line-height: 150%; padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 20px; text-align: left;" align="left">
                                                        <h2 style="display: block; font-family: Helvetica; font-size: 20px; font-style: normal; font-weight: bold; line-height: 100%; letter-spacing: normal; margin-top: 0; margin-right: 0; margin-bottom: 10px; margin-left: 0; text-align: left; color: #404040;">Styling Your Content</h2>
                                                        <h4 style="display: block; font-family: Helvetica; font-size: 14px; font-style: italic; font-weight: normal; line-height: 100%; letter-spacing: normal; margin-top: 0; margin-right: 0; margin-bottom: 10px; margin-left: 0; text-align: left; color: #808080;">Make your email easy to read</h4>
                                                        After you enter your content, highlight the text you want to style and select the options you set in the style editor in the "<em>styles</em>" drop down box. Want to <a href="http://www.mailchimp.com/kb/article/im-using-the-style-designer-and-i-cant-get-my-formatting-to-change" target="_blank" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">get rid of styling on a bit of text</a>, but having trouble doing it? Just use the "<em>remove formatting</em>" button to strip the text of any formatting and reset your style.
                                                    </td>
                                                </tr>
                                            </table>
                                            <!-- // END BODY -->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" valign="top" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <!-- BEGIN COLUMNS // -->
                                            <table border="0" cellpadding="20" cellspacing="0" width="100%" id="templateColumns" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #F4F4F4; border-top: 1px solid #FFFFFF; border-bottom: 1px solid #CCCCCC; border-collapse: collapse;" bgcolor="#F4F4F4">
                                                <tr mc:repeatable="">
                                                    <td align="left" valign="top" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding-bottom: 0;">
                                                        <table align="left" border="0" cellpadding="0" cellspacing="0" class="templateColumnContainer" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline; width: 260px; border-collapse: collapse;" width="260">
                                                            <tr>
                                                                <td class="leftColumnContent" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #505050; font-family: Helvetica; font-size: 14px; line-height: 150%; padding-top: 0; padding-right: 0; padding-bottom: 20px; padding-left: 0; text-align: left;" align="left">
                                                                    <img src="http://gallery.mailchimp.com/27aac8a65e64c994c4416d6b8/images/header_placeholder_260px.png" style="-ms-interpolation-mode: bicubic; border: 0; line-height: 100%; outline: none; text-decoration: none; display: inline; height: auto; max-width: 260px;" class="columnImage" mc:label="left_column_image" mc:edit="left_column_image">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td valign="top" class="leftColumnContent" mc:edit="left_column_content" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #505050; font-family: Helvetica; font-size: 14px; line-height: 150%; padding-top: 0; padding-right: 0; padding-bottom: 20px; padding-left: 0; text-align: left;" align="left">
                                                                    <h3 style="display: block; font-family: Helvetica; font-size: 16px; font-style: italic; font-weight: normal; line-height: 100%; letter-spacing: normal; margin-top: 0; margin-right: 0; margin-bottom: 10px; margin-left: 0; text-align: left; color: #606060;">Repeatable Content</h3>
                                                                    <a href="http://kb.mailchimp.com/article/how-do-i-work-with-repeatable-content-blocks" target="_blank" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">Repeatable sections</a> are noted with plus and minus signs so that you can add and subtract content blocks.
                                                                    <br>
                                                                    <br>
                                                                    You can also get a little fancy; repeat blocks and remove all text to make image galleries, or do the opposite and remove images for text-only blocks.
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table align="right" border="0" cellpadding="0" cellspacing="0" class="templateColumnContainer" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline; width: 260px; border-collapse: collapse;" width="260">
                                                            <tr>
                                                                <td class="rightColumnContent" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #505050; font-family: Helvetica; font-size: 14px; line-height: 150%; padding-top: 0; padding-right: 0; padding-bottom: 20px; padding-left: 0; text-align: left;" align="left">
                                                                    <img src="http://gallery.mailchimp.com/27aac8a65e64c994c4416d6b8/images/header_placeholder_260px.png" style="-ms-interpolation-mode: bicubic; border: 0; line-height: 100%; outline: none; text-decoration: none; display: inline; height: auto; max-width: 260px;" class="columnImage" mc:label="right_column_image" mc:edit="right_column_image">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td valign="top" class="rightColumnContent" mc:edit="right_column_content" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #505050; font-family: Helvetica; font-size: 14px; line-height: 150%; padding-top: 0; padding-right: 0; padding-bottom: 20px; padding-left: 0; text-align: left;" align="left">
                                                                    <h3 style="display: block; font-family: Helvetica; font-size: 16px; font-style: italic; font-weight: normal; line-height: 100%; letter-spacing: normal; margin-top: 0; margin-right: 0; margin-bottom: 10px; margin-left: 0; text-align: left; color: #606060;">Repeatable Content</h3>
                                                                    <a href="http://kb.mailchimp.com/article/how-do-i-work-with-repeatable-content-blocks" target="_blank" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">Repeatable sections</a> are noted with plus and minus signs so that you can add and subtract content blocks.
                                                                    <br>
                                                                    <br>
                                                                    You can also get a little fancy; repeat blocks and remove all text to make image galleries, or do the opposite and remove images for text-only blocks.
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!-- // END COLUMNS -->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" valign="top" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <!-- BEGIN FOOTER // -->
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateFooter" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #F4F4F4; border-top: 1px solid #FFFFFF; border-collapse: collapse;" bgcolor="#F4F4F4">
                                                <tr>
                                                    <td valign="top" class="footerContent" mc:edit="footer_content00" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #808080; font-family: Helvetica; font-size: 10px; line-height: 150%; padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 20px; text-align: left;" align="left">
                                                        <a href="*|TWITTER:PROFILEURL|*" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">Follow on Twitter</a>&nbsp;&nbsp;&nbsp;<a href="*|FACEBOOK:PROFILEURL|*" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">Friend on Facebook</a>&nbsp;&nbsp;&nbsp;<a href="*|FORWARD|*" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">Forward to Friend</a>&nbsp;
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" class="footerContent" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #808080; font-family: Helvetica; font-size: 10px; line-height: 150%; padding-right: 20px; padding-bottom: 20px; padding-left: 20px; text-align: left; padding-top: 0;" mc:edit="footer_content01" align="left">
                                                        <em>Copyright &copy; *|CURRENT_YEAR|* *|LIST:COMPANY|*, All rights reserved.</em>
                                                        <br>
                                                        *|IFNOT:ARCHIVE_PAGE|* *|LIST:DESCRIPTION|*
                                                        <br>
                                                        <br>
                                                        <strong>Our mailing address is:</strong>
                                                        <br>
                                                        *|HTML:LIST_ADDRESS_HTML|* *|END:IF|*
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" class="footerContent" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #808080; font-family: Helvetica; font-size: 10px; line-height: 150%; padding-right: 20px; padding-bottom: 20px; padding-left: 20px; text-align: left; padding-top: 0;" mc:edit="footer_content02" align="left">
                                                        <a href="*|UNSUB|*" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">unsubscribe from this list</a>&nbsp;&nbsp;&nbsp;<a href="*|UPDATE_PROFILE|*" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">update subscription preferences</a>&nbsp;
                                                    </td>
                                                </tr>
                                            </table>
                                            <!-- // END FOOTER -->
                                        </td>
                                    </tr>
                                </table>
                                <!-- // END TEMPLATE -->
                            </td>
                        </tr>
                    </table>
                </center>
            </body>
        </html>
        `;
        return theme2;
    }
}
Theme2.Instance = function () {
    if (this._instance) {
        return this._instance;
    }
    else {
        return (this._instance = new this());
    }
};
exports.Theme2 = Theme2;
//# sourceMappingURL=theme2.js.map