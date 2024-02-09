import Column from "@/components/Column";
import EMLogo from "@/components/EMLogo";
import Page from "@/components/Page";
import Text from "@/components/Text";

export default function Home() {
  return (
    <Page>
      <Column className="w-full h-full p-8 items-center justify-center">
        <EMLogo size={200} />
        <Text variant="primary" className="text-5xl uppercase font-semibold">
          Editorial Manager
        </Text>
      </Column>
    </Page>
  );
}
