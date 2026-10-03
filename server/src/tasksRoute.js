import express from 'express';
const router = express.Router();

// অটো টাস্ক অ্যাপ্রুভ এবং ১০% কমিশন কাটার রাউট
router.post('/approve-task', (req, res) => {
    const { task_id, reward } = req.body;

    if (!task_id || !reward) {
        return res.status(400).json({ error: "প্রয়োজনীয় তথ্য পাওয়া যায়নি!" });
    }

    // প্ল্যাটফর্মের জন্য ১০% কমিশন এবং ওয়ার্কারের জন্য ৯০% পেমেন্ট হিসাব করা
    const commission = reward * 0.10;
    const workerPayout = reward - commission;

    res.status(200).json({
        status: "success",
        message: `কাজ সফলভাবে অনুমোদিত হয়েছে! ১০% কমিশন (${commission} টাকা) কেটে নেওয়ার পর ওয়ার্কারের অ্যাকাউন্টে ${workerPayout} টাকা জমা করা হয়েছে।`,
        platform_commission: commission,
        worker_earnings: workerPayout
    });
});

export default router;
