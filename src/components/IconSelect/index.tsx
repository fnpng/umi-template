import { Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import * as AntDesignIcons from 'react-icons/ai'; // 导入整个Ant Design图标集
import * as BoxIcons from 'react-icons/bi'; // 导入整个BiIcons图标集
import * as BootstrapIcons from 'react-icons/bs'; // 导入整个BsIcons图标集
import * as CssggIcons from 'react-icons/cg'; // 导入整个CgIcons图标集
import * as FontAwesomeIcons from 'react-icons/fa'; // 导入整个Font Awesome图标集
import * as FontAwesome6Icons from 'react-icons/fa6'; // 导入整个Font Awesome 6图标集
import * as FlatColorsIcons from 'react-icons/fc'; // 导入整个Ionic图标集
import * as MaterialIcons from 'react-icons/md'; // 导入整个Material Design图标集

// 手动创建一个图标名称列表（这里只是示例，你需要扩展它）
const iconLibraries = {
  ai: Object.keys(AntDesignIcons), // 获取AntDesignIcons的所有导出名称
  bi: Object.keys(BoxIcons), // 获取BiIcons的所有导出名称
  bs: Object.keys(BootstrapIcons), // 获取BsIcons的所有导出名称
  cg: Object.keys(CssggIcons), // 获取CiIcons的所有导出名称
  fa: Object.keys(FontAwesomeIcons), // 获取FaIcons的所有导出名称
  fa6: Object.keys(FontAwesome6Icons), // 获取FaIcons的所有导出名称
  md: Object.keys(MaterialIcons), // 获取MdIcons的所有导出名称
  fc: Object.keys(FlatColorsIcons), // 获取IonicIcons的所有导出名称
};

const iconLibrariesList = [
  {
    label: 'Font Awesome',
    value: 'fa',
  },
  {
    label: 'Font Awesome 6',
    value: 'fa6',
  },
  {
    label: 'Material Design',
    value: 'md',
  },
  {
    label: 'Flat Colors',
    value: 'fc',
  },
  {
    label: 'Bootstrap Icons',
    value: 'bs',
  },
  {
    label: 'Ant Design Icons',
    value: 'ai',
  },
  {
    label: 'Box Icons',
    value: 'bi',
  },
  {
    label: 'Css Gg Icons',
    value: 'cg',
  },
];

export const renderIcon = (name: string | undefined) => {
  if (!name) return null;

  // 解析保存在value中的图标库和图标名
  const [lib, iconName] = name.split('|');
  const IconComponent =
    lib === 'fa'
      ? FontAwesomeIcons[iconName as keyof typeof FontAwesomeIcons]
      : lib === 'fa6'
      ? FontAwesome6Icons[iconName as keyof typeof FontAwesome6Icons]
      : lib === 'md'
      ? MaterialIcons[iconName as keyof typeof MaterialIcons]
      : lib === 'fc'
      ? FlatColorsIcons[iconName as keyof typeof FlatColorsIcons]
      : lib === 'bs'
      ? BootstrapIcons[iconName as keyof typeof BootstrapIcons]
      : lib === 'cg'
      ? CssggIcons[iconName as keyof typeof CssggIcons]
      : lib === 'bi'
      ? BoxIcons[iconName as keyof typeof BoxIcons]
      : lib === 'ai'
      ? AntDesignIcons[iconName as keyof typeof AntDesignIcons]
      : MaterialIcons[iconName as keyof typeof MaterialIcons];

  return IconComponent ? <IconComponent /> : null;
};

function IconSelector({
  value,
  onChange,
  className,
}: {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}) {
  const [selectedIcon, setSelectedIcon] = useState('');
  const [selectedLib, setSelectedLib] = useState('fa');
  const [open, setOpen] = useState(false);

  const handleIconChange = (value: string) => {
    setSelectedIcon(value);
    onChange?.(`${value}`);
  };

  useEffect(() => {
    setSelectedIcon(value || '');
  }, [value]);

  const getIconLibraries = (lib: string) => {
    return iconLibraries[lib as keyof typeof iconLibraries];
  };

  const [searchIcon, setSearchIcon] = useState('');

  const handleSearch = (value: string) => {
    setSearchIcon(value);
  };

  return (
    <div className={`${className}`}>
      <Select
        open={open}
        onOpenChange={setOpen}
        options={getIconLibraries(selectedLib).map((iconName) => ({
          label: iconName,
          value: `fa|${iconName}`,
        }))}
        placeholder="请选择图标"
        value={selectedIcon}
        className="w-full"
        labelRender={(option) => (
          <div className="flex items-center gap-2">
            {renderIcon(option.value as string)}
            {option.value}
          </div>
        )}
        popupRender={() => (
          <div>
            <div className="flex flex-wrap pl-2 py-2 gap-2 overflow-x-auto">
              {iconLibrariesList.map((item) => (
                <div
                  className={`font-bold cursor-pointer hover:bg-gray-100 rounded-md p-1 ${
                    selectedLib === item.value
                      ? 'bg-indigo-50 text-indigo-500'
                      : ''
                  }`}
                  key={item.value}
                  onClick={() => {
                    setSelectedLib(item.value);
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
            <div className="px-2">
              <Input
                placeholder="请输入图标名称"
                allowClear
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap pl-2 py-2 gap-2 max-h-[256px] overflow-y-auto">
              {getIconLibraries(selectedLib)
                .filter((iconName) => {
                  return iconName
                    ?.toLocaleLowerCase()
                    .includes(searchIcon?.toLocaleLowerCase());
                })
                .map((iconName) => (
                  <div
                    key={iconName}
                    className={`flex items-center gap-2 w-[24px] h-[24px] cursor-pointer hover:bg-gray-100 rounded-md p-1 ${
                      selectedIcon === `${selectedLib}|${iconName}`
                        ? 'bg-indigo-50 text-indigo-500'
                        : ''
                    }`}
                    onClick={() => {
                      handleIconChange(`${selectedLib}|${iconName}`);
                      setOpen(false);
                    }}
                  >
                    {renderIcon(`${selectedLib}|${iconName}`)}
                  </div>
                ))}
            </div>
          </div>
        )}
      />
    </div>
  );
}

export default IconSelector;
