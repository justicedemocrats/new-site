import React from "react";
import InnerHTML from "dangerously-set-inner-html";

const _standardWidgetCode = `
  <script type="text/javascript" src="https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.js"></script>
  <script type="text/javascript">
    FreshWidget.init("", {"queryString": "&widgetType=popup", "utf8": "✓", "widgetType": "popup", "buttonType": "text", "buttonText": "Support", "buttonColor": "white", "buttonBg": "#006063", "alignment": "4", "offset": "235px", "formHeight": "500px", "url": "https://justicedems.freshdesk.com"} );
  </script>
`;

const script = `
<script type="text/javascript">
  var script = document.createElement('script')
  script.src = "https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.js"
  script.onload = function()  {
    FreshWidget.init("", {"queryString": "&widgetType=popup", "utf8": "✓", "widgetType": "popup", "buttonType": "text", "buttonText": "Support", "buttonColor": "white", "buttonBg": "#006063", "alignment": "4", "offset": "235px", "formHeight": "500px", "url": "https://justicedems.freshdesk.com"} );
  }

  document.body.appendChild(script)
</script>
`;

export default class HelpDesk extends React.Component {
  render() {
    return <InnerHTML html={script} />;
  }
}
