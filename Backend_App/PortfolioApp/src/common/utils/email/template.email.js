export const emailTemplate = ({
  name,
  email,
  reason,
  message,
}) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>New Portfolio Message</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #0f0a1f;
          font-family: Arial, Helvetica, sans-serif;
          color: #ffffff;
        "
      >

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="background-color: #0f0a1f; padding: 40px 20px;"
        >

          <tr>
            <td align="center">

              <table
                width="600"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  max-width: 600px;
                  width: 100%;
                  background-color: #17102d;
                  border: 1px solid #3d286b;
                  border-radius: 12px;
                  overflow: hidden;
                "
              >

                <!-- Header -->
                <tr>
                  <td
                    style="
                      padding: 30px;
                      background-color: #21163f;
                      border-bottom: 1px solid #3d286b;
                    "
                  >

                    <div
                      style="
                        font-size: 13px;
                        color: #9b7cff;
                        letter-spacing: 2px;
                        margin-bottom: 10px;
                      "
                    >
                      PORTFOLIO CMS
                    </div>

                    <h1
                      style="
                        margin: 0;
                        font-size: 28px;
                        color: #ffffff;
                      "
                    >
                      New Message
                    </h1>

                    <p
                      style="
                        margin: 10px 0 0;
                        color: #b9add8;
                        font-size: 14px;
                      "
                    >
                      You received a new message from your portfolio.
                    </p>

                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 30px;">

                    <!-- Name -->
                    <div style="margin-bottom: 24px;">

                      <div
                        style="
                          font-size: 12px;
                          color: #9b7cff;
                          text-transform: uppercase;
                          letter-spacing: 1px;
                          margin-bottom: 7px;
                        "
                      >
                        Name
                      </div>

                      <div
                        style="
                          font-size: 16px;
                          color: #ffffff;
                        "
                      >
                        ${name}
                      </div>

                    </div>


                    <!-- Email -->
                    <div style="margin-bottom: 24px;">

                      <div
                        style="
                          font-size: 12px;
                          color: #9b7cff;
                          text-transform: uppercase;
                          letter-spacing: 1px;
                          margin-bottom: 7px;
                        "
                      >
                        Email
                      </div>

                      <div
                        style="
                          font-size: 16px;
                          color: #ffffff;
                        "
                      >
                        <a
                          href="mailto:${email}"
                          style="
                            color: #b49aff;
                            text-decoration: none;
                          "
                        >
                          ${email}
                        </a>
                      </div>

                    </div>


                    <!-- Reason -->
                    <div style="margin-bottom: 24px;">

                      <div
                        style="
                          font-size: 12px;
                          color: #9b7cff;
                          text-transform: uppercase;
                          letter-spacing: 1px;
                          margin-bottom: 7px;
                        "
                      >
                        Reason
                      </div>

                      <div
                        style="
                          display: inline-block;
                          padding: 8px 14px;
                          background-color: #291951;
                          border: 1px solid #55378f;
                          border-radius: 20px;
                          color: #c7b8ff;
                          font-size: 14px;
                        "
                      >
                        ${reason}
                      </div>

                    </div>


                    <!-- Message -->
                    <div>

                      <div
                        style="
                          font-size: 12px;
                          color: #9b7cff;
                          text-transform: uppercase;
                          letter-spacing: 1px;
                          margin-bottom: 10px;
                        "
                      >
                        Message
                      </div>

                      <div
                        style="
                          padding: 18px;
                          background-color: #100a20;
                          border: 1px solid #35245c;
                          border-radius: 8px;
                          color: #ddd6f5;
                          font-size: 15px;
                          line-height: 1.7;
                          white-space: pre-line;
                        "
                      >
                        ${message}
                      </div>

                    </div>

                  </td>
                </tr>


                <!-- Footer -->
                <tr>
                  <td
                    style="
                      padding: 20px 30px;
                      background-color: #130c26;
                      border-top: 1px solid #3d286b;
                      text-align: center;
                    "
                  >

                    <p
                      style="
                        margin: 0;
                        font-size: 12px;
                        color: #746a91;
                      "
                    >
                      This message was sent from your portfolio contact form.
                    </p>

                    <p
                      style="
                        margin: 8px 0 0;
                        font-size: 12px;
                        color: #9b7cff;
                      "
                    >
                      Nada Mahmoud · Backend Developer
                    </p>

                  </td>
                </tr>

              </table>

            </td>
          </tr>

        </table>

      </body>
    </html>
  `;
};