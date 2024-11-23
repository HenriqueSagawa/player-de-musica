import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";

export function Icon() {
  const theme = useTheme();
  const isDark: any = theme.theme == "dark" ? true : false;
  return <>{isDark ? <MdDarkMode /> : <MdLightMode />}</>;
}