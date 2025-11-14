import React from "react";
// import SideBarEquipment from "../Components/SideBarEquipment";
import TableHeader from "../Components/TableHeader";
import FormCreateAsset from "../Components/Forms/FormCreateAsset";
import SideBarCreateAsset from "../Components/SideBars/SideBarCreateAsset";
import HeaderNav from "../Components/Common/HeaderNav";

const AssetCreate = () => {
  return (
    <div className="department-main">
      <div className="dep-mid">
        {/* <SideBarEquipment /> */}
        <SideBarCreateAsset />
        <div className="page-content">
          {/* <TableHeader /> */}
          <FormCreateAsset />
        </div>
      </div>
    </div>
  );
};

export default AssetCreate;
