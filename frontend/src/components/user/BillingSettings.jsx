const BillingSettings = () => {
  return (
    <section  className="lg:mt-10">
      <h2 className="text-2xl font-extrabold mb-2">Billing & Plans</h2>
      <p className="text-[#C4C1A0] mb-6">
        Manage your subscription and payments.
      </p>

      <div className="border border-[#2A2A20] rounded-xl p-6 bg-[#141410]">
        <p className="font-bold mb-2">Current Plan</p>
        <p className="text-xl font-black text-[#F2CC0D]">Free</p>

        <button className="w-full sm:w-auto mt-4 px-6 py-3 bg-[#F2CC0D] text-black font-bold rounded-lg">
          Upgrade to Pro
        </button>
      </div>
    </section>
  );
};

export default BillingSettings;
