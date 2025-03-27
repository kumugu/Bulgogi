import ProfileImageEditForm from "@/components/user/userSettings/ProfileImageEdit";
import BioEditForm from "@/components/user/userSettings/BioEdit";
import ChangePasswordForm from "@/components/user/account/ChangePassword";
import DeleteAccountForm from "@/components/user/account/DeleteAccount";

const userSettingsPage = () => {
    return (
        <div className="max-w-md mx-auto mt-10">
            <ProfileImageEditForm />
            <BioEditForm />
            <ChangePasswordForm />
            <DeleteAccountForm />
        </div>
    );
};

export default userSettingsPage;