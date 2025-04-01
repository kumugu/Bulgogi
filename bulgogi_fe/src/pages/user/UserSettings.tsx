import BioEditForm from "@/components/user/userSettings/BioUpdate";
import ChangePasswordForm from "@/components/user/account/ChangePassword";
import DeleteAccountForm from "@/components/user/account/DeleteAccount";
import ProfileImageUploader from "@/components/user/userSettings/ProfileImageUpdate";

const userSettingsPage = () => {
    return (
        <div className="max-w-md mx-auto mt-10">
            <ProfileImageUploader /><br /><br />
            <BioEditForm /><br /><br />
            <ChangePasswordForm /><br /><br />
            <DeleteAccountForm /><br /><br />
        </div>
    );
};

export default userSettingsPage;
