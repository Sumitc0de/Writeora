const NotificationSettings = () => {
  return (
    <section  className="lg:mt-10">
      <h2 className="text-2xl font-extrabold mb-2">
        Notification Preferences
      </h2>
      <p className="text-[#C4C1A0] mb-6">
        Choose how you want to be notified.
      </p>

      <div className="space-y-6">
        {/* Email Notifications */}
        <div className="flex items-center justify-between border border-[#2A2A20] rounded-lg p-4">
          <div>
            <h4 className="font-bold">Email Notifications</h4>
            <p className="text-sm text-[#C4C1A0]">
              Receive updates via email.
            </p>
          </div>
          <input
            type="checkbox"
            defaultChecked
            className="accent-[#F2CC0D] w-5 h-5"
          />
        </div>

        {/* Comments */}
        <div className="flex items-center justify-between border border-[#2A2A20] rounded-lg p-4">
          <div>
            <h4 className="font-bold">Comments on your posts</h4>
            <p className="text-sm text-[#C4C1A0]">
              Get notified when someone comments.
            </p>
          </div>
          <input
            type="checkbox"
            defaultChecked
            className="accent-[#F2CC0D] w-5 h-5"
          />
        </div>

        {/* Likes */}
        <div className="flex items-center justify-between border border-[#2A2A20] rounded-lg p-4">
          <div>
            <h4 className="font-bold">Likes</h4>
            <p className="text-sm text-[#C4C1A0]">
              When someone likes your post.
            </p>
          </div>
          <input
            type="checkbox"
            className="accent-[#F2CC0D] w-5 h-5"
          />
        </div>

        {/* New Features */}
        <div className="flex items-center justify-between border border-[#2A2A20] rounded-lg p-4">
          <div>
            <h4 className="font-bold">Product Updates</h4>
            <p className="text-sm text-[#C4C1A0]">
              News about new Writeora features.
            </p>
          </div>
          <input
            type="checkbox"
            defaultChecked
            className="accent-[#F2CC0D] w-5 h-5"
          />
        </div>
      </div>

      <button className="mt-8 px-8 h-12 bg-[#F2CC0D] text-black font-bold rounded-lg hover:bg-[#FFE45F] transition">
        Save Preferences
      </button>
    </section>
  );
};

export default NotificationSettings;
