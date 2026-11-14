import { ButtonsAndCardsDemo } from './demos/ButtonsAndCardsDemo';
import { FormsAndSearchDemo } from './demos/FormsAndSearchDemo';
import { OverlaysAndCarouselDemo } from './demos/OverlaysAndCarouselDemo';
import { TabsFeedbackAndDataDemo } from './demos/TabsFeedbackAndDataDemo';

export function InteractiveSection() {
  return (
    <div className="space-y-8">
      <ButtonsAndCardsDemo />
      <FormsAndSearchDemo />
      <OverlaysAndCarouselDemo />
      <TabsFeedbackAndDataDemo />
    </div>
  );
}
