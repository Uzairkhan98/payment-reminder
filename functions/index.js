const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require("firebase-admin");
admin.initializeApp();

exports.sendNotificationToUser = functions.pubsub
  //The below statement runs a cron job scheduled for 3pm everyday
  .schedule("0 15 * * *")
  .onRun(async (context) => {
    const paymentRef = admin.firestore().collection("payment");
    const usersRef = admin.firestore().collection("users");
    const paymentsSnapshot = await paymentRef
      .where("paymentStatus", "==", false)
      .get();
    const tokens = new Set();
    let usersData;

    try {
      const usersSnapshot = await usersRef.get();

      usersData = usersSnapshot.docs.reduce((acc, val) => {
        const res = val.data();
        return { ...acc, [val.id]: res };
      }, {});
    } catch (error) {
      console.error(error);
    }
    console.log(usersData);
    // Get the FCM tokens of all users who have a payment with paymentStatus = false
    paymentsSnapshot.forEach((doc) => {
      const userData = doc.data().user.split("/");
      const userId = userData[userData?.length - 1];
      if (
        Object.keys(usersData).includes(userId) &&
        !!usersData[userId].fcmToken
      )
        tokens.add(usersData[userId].fcmToken);
      else {
        console.log(
          "Ïn else block",
          userId,
          Object.keys(usersData).includes(userId),
          usersData[userId]
        );
      }
    });

    console.log("These are my tokens", tokens, tokens.size);
    if (tokens.size > 0) {
      const message = {
        notification: {
          title: "Payment notification",
          body: "Kindly complete all your due payments",
        },
        tokens: Array.from(tokens),
      };

      // Send the notification using the FCM SDK
      const response = await admin.messaging().sendMulticast(message);
      console.log(response);
      console.log(`${response.successCount} messages were sent successfully`);
    }
  });
