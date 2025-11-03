import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Fonts } from '../styles/fonts';
import { Colors } from '../styles/colors';

const { width } = Dimensions.get('window');

type TermsConditionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TermsCondition'
>;

interface Props {
  navigation: TermsConditionScreenNavigationProp;
}

const TermsConditionScreen: React.FC<Props> = ({ navigation }) => {
  const renderHeroSection = () => (
    <View style={styles.heroSection}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop' }}
        style={styles.heroImage}
      />
      <View style={styles.heroOverlay}>
        <Text style={styles.heroTitle}>Terms & Conditions</Text>
      </View>
    </View>
  );

  const renderSection = (title: string, content: string[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {content.map((paragraph, index) => (
        <Text key={index} style={styles.sectionText}>
          {paragraph}
        </Text>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {renderHeroSection()}
      
      <View style={styles.contentSection}>
        <Text style={styles.introText}>
          Please read these Terms and Conditions carefully before using our service. By accessing or using Decor Mate, you agree to be bound by these Terms.
        </Text>

        {renderSection('1. Acceptance of Terms', [
          'By accessing and using the Decor Mate platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
          'These Terms apply to all users of the service, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.'
        ])}

        {renderSection('2. Use License', [
          'Permission is granted to temporarily access the materials on Decor Mate\'s platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:',
          '• Modify or copy the materials;',
          '• Use the materials for any commercial purpose or for any public display (commercial or non-commercial);',
          '• Attempt to decompile or reverse engineer any software contained on Decor Mate\'s platform;',
          '• Remove any copyright or other proprietary notations from the materials; or',
          '• Transfer the materials to another person or "mirror" the materials on any other server.'
        ])}

        {renderSection('3. User Accounts', [
          'When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.',
          'You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.'
        ])}

        {renderSection('4. Services and Marketplace', [
          'Decor Mate operates as a marketplace that connects clients with interior design professionals. We facilitate transactions but are not directly involved in the design services provided.',
          'All design services are provided by independent professionals. Decor Mate is not responsible for the quality, safety, or legality of services provided by professionals on our platform.',
          'Prices and availability of services are subject to change without notice. We reserve the right to modify or discontinue any service without prior notice.'
        ])}

        {renderSection('5. Payment Terms', [
          'Payments for services booked through our platform are processed securely. All fees are clearly displayed before you complete a booking.',
          'Refunds are subject to our refund policy and the specific terms agreed upon between you and the service provider.',
          'We reserve the right to change our payment terms and pricing at any time, but such changes will not affect bookings already made.'
        ])}

        {renderSection('6. Intellectual Property', [
          'The Service and its original content, features, and functionality are and will remain the exclusive property of Decor Mate and its licensors.',
          'All designs, images, and content uploaded by users remain the property of the respective users, who grant Decor Mate a license to display such content on the platform.',
          'You may not use our logo, trademarks, or other proprietary graphics without our prior written consent.'
        ])}

        {renderSection('7. Prohibited Uses', [
          'You may not use our service:',
          '• For any unlawful purpose or to solicit others to perform unlawful acts;',
          '• To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances;',
          '• To infringe upon or violate our intellectual property rights or the intellectual property rights of others;',
          '• To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate;',
          '• To submit false or misleading information;',
          '• To upload or transmit viruses or any other type of malicious code;',
          '• To collect or track the personal information of others;',
          '• To spam, phish, pharm, pretext, spider, crawl, or scrape; or',
          '• For any obscene or immoral purpose.'
        ])}

        {renderSection('8. Privacy Policy', [
          'Your use of the Service is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.',
          'By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.'
        ])}

        {renderSection('9. Disclaimer', [
          'The materials on Decor Mate\'s platform are provided on an \'as is\' basis. Decor Mate makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
          'Further, Decor Mate does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its platform or otherwise relating to such materials or on any sites linked to this platform.'
        ])}

        {renderSection('10. Limitations', [
          'In no event shall Decor Mate or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Decor Mate\'s platform, even if Decor Mate or a Decor Mate authorized representative has been notified orally or in writing of the possibility of such damage.',
          'Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.'
        ])}

        {renderSection('11. Revisions', [
          'Decor Mate may revise these Terms at any time without notice. By using this platform, you are agreeing to be bound by the then current version of these Terms and Conditions of Use.',
          'We recommend reviewing these Terms periodically for any changes. Continued use of the Service after changes constitutes acceptance of the new Terms.'
        ])}

        {renderSection('12. Governing Law', [
          'These Terms shall be interpreted and governed by the laws of the jurisdiction in which Decor Mate operates, without regard to its conflict of law provisions.',
          'Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration or in the courts of the applicable jurisdiction.'
        ])}

        {renderSection('13. Contact Information', [
          'If you have any questions about these Terms and Conditions, please contact us at:',
          'Email: support@decormate.com',
          'Phone: +1 (555) 123-4567',
          'Address: 123 Design Street, Creative City, CC 12345'
        ])}

        <View style={styles.lastUpdatedSection}>
          <Text style={styles.lastUpdatedText}>
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroSection: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  heroTitle: {
    fontSize: 48,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    textAlign: 'center',
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: Colors.background,
  },
  introText: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
    lineHeight: 24,
    marginBottom: 32,
    textAlign: 'justify',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 16,
    lineHeight: 28,
  },
  sectionText: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 12,
    textAlign: 'justify',
  },
  lastUpdatedSection: {
    marginTop: 40,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  lastUpdatedText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
});

export default TermsConditionScreen;

