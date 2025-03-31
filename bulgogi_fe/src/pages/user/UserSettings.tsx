import BioEditForm from "@/components/user/userSettings/BioEdit";
import ChangePasswordForm from "@/components/user/account/ChangePassword";
import DeleteAccountForm from "@/components/user/account/DeleteAccount";
import ProfileImageUploader from "@/components/user/userSettings/ProfileImageUploader";

const userSettingsPage = () => {
    return (
        <div className="max-w-md mx-auto mt-10">
            <ProfileImageUploader />
            <BioEditForm />
            <ChangePasswordForm />
            <DeleteAccountForm />
        </div>
    );
};

export default userSettingsPage;
